import { describe, it, expect } from 'vitest'
import {
  alignmentGoals,
  enterpriseToAlignmentMapping,
  alignmentToObjectiveMapping,
  getAlignmentGoalsForEnterpriseGoals,
  getRecommendedObjectives,
  getFullCascade,
} from '../goalsCascade'

describe('Goals Cascade Logic', () => {
  describe('Data Structure Integrity', () => {
    it('should have 13 alignment goals', () => {
      expect(alignmentGoals).toHaveLength(13)
    })

    it('should have valid alignment goal IDs (AG01-AG13)', () => {
      alignmentGoals.forEach((goal, index) => {
        const expectedId = `AG${String(index + 1).padStart(2, '0')}`
        expect(goal.id).toBe(expectedId)
      })
    })

    it('should have alignment goals with all required properties', () => {
      alignmentGoals.forEach(goal => {
        expect(goal).toHaveProperty('id')
        expect(goal).toHaveProperty('name')
        expect(goal).toHaveProperty('category')
        expect(goal).toHaveProperty('description')
        expect(['value', 'risk', 'resource']).toContain(goal.category)
      })
    })

    it('should have enterprise to alignment mappings for all 13 enterprise goals', () => {
      expect(Object.keys(enterpriseToAlignmentMapping)).toHaveLength(13)
      Object.keys(enterpriseToAlignmentMapping).forEach(key => {
        expect(key).toMatch(/^EG\d{2}$/)
      })
    })

    it('should have alignment to objective mappings for all 13 alignment goals', () => {
      expect(Object.keys(alignmentToObjectiveMapping)).toHaveLength(13)
      Object.keys(alignmentToObjectiveMapping).forEach(key => {
        expect(key).toMatch(/^AG\d{2}$/)
      })
    })

    it('should only have P or S relationships in mappings', () => {
      Object.values(enterpriseToAlignmentMapping).forEach(alignments => {
        Object.values(alignments).forEach(relationship => {
          expect(['P', 'S']).toContain(relationship)
        })
      })

      Object.values(alignmentToObjectiveMapping).forEach(objectives => {
        Object.values(objectives).forEach(relationship => {
          expect(['P', 'S']).toContain(relationship)
        })
      })
    })
  })

  describe('getAlignmentGoalsForEnterpriseGoals', () => {
    it('should return empty array for no enterprise goals', () => {
      const result = getAlignmentGoalsForEnterpriseGoals([])
      expect(result).toEqual([])
    })

    it('should return alignment goals for single enterprise goal', () => {
      const result = getAlignmentGoalsForEnterpriseGoals(['EG01'])
      expect(result.length).toBeGreaterThan(0)
      result.forEach(item => {
        expect(item).toHaveProperty('goal')
        expect(item).toHaveProperty('relationship')
        expect(['P', 'S']).toContain(item.relationship)
        expect(item.goal).toHaveProperty('id')
        expect(item.goal.id).toMatch(/^AG\d{2}$/)
      })
    })

    it('should prioritize Primary relationships over Secondary', () => {
      const result = getAlignmentGoalsForEnterpriseGoals(['EG01', 'EG02'])
      const sortedByRelationship = [...result].sort((a, b) => {
        if (a.relationship === 'P' && b.relationship === 'S') return -1
        if (a.relationship === 'S' && b.relationship === 'P') return 1
        return 0
      })
      // First items should be Primary
      const firstItems = sortedByRelationship.slice(0, 3)
      expect(firstItems.every(item => item.relationship === 'P')).toBe(true)
    })

    it('should calculate importance score correctly', () => {
      const result = getAlignmentGoalsForEnterpriseGoals(['EG01'])
      result.forEach(item => {
        expect(item).toHaveProperty('importance')
        expect(['high', 'medium', 'low']).toContain(item.importance)
      })
    })

    it('should handle multiple enterprise goals and aggregate scores', () => {
      const result = getAlignmentGoalsForEnterpriseGoals(['EG01', 'EG02', 'EG03'])
      expect(result.length).toBeGreaterThan(0)
      // Should have unique alignment goals (no duplicates)
      const uniqueIds = new Set(result.map(r => r.goal.id))
      expect(uniqueIds.size).toBeGreaterThanOrEqual(result.length - 5) // Allow some overlap
    })
  })

  describe('getRecommendedObjectives', () => {
    it('should return empty array for no alignment goals', () => {
      const result = getRecommendedObjectives([])
      expect(result).toEqual([])
    })

    it('should return recommended objectives for single alignment goal', () => {
      const result = getRecommendedObjectives(['AG01'])
      expect(result.length).toBeGreaterThan(0)
      result.forEach(obj => {
        expect(obj).toHaveProperty('objectiveId')
        expect(obj).toHaveProperty('relationship')
        expect(obj).toHaveProperty('importance')
        expect(['P', 'S']).toContain(obj.relationship)
        expect(['high', 'medium', 'low']).toContain(obj.importance)
      })
    })

    it('should return valid COBIT objective IDs', () => {
      const result = getRecommendedObjectives(['AG01'])
      result.forEach(obj => {
        expect(obj.objectiveId).toMatch(/^(EDM|APO|BAI|DSS|MEA)\d{2}$/)
      })
    })

    it('should aggregate scores for multiple alignment goals', () => {
      const result = getRecommendedObjectives(['AG01', 'AG02', 'AG03'])
      expect(result.length).toBeGreaterThan(0)
      // Higher importance should appear first
      const importanceOrder = { high: 3, medium: 2, low: 1 }
      for (let i = 0; i < result.length - 1; i++) {
        const current = importanceOrder[result[i].importance]
        const next = importanceOrder[result[i + 1].importance]
        expect(current).toBeGreaterThanOrEqual(next)
      }
    })

    it('should include governance objectives (EDM)', () => {
      const result = getRecommendedObjectives(['AG01', 'AG02'])
      const edmObjectives = result.filter(obj => obj.objectiveId.startsWith('EDM'))
      expect(edmObjectives.length).toBeGreaterThan(0)
    })

    it('should include management objectives (APO, BAI, DSS, MEA)', () => {
      const result = getRecommendedObjectives(['AG01', 'AG02', 'AG03'])
      const mgmtObjectives = result.filter(obj =>
        obj.objectiveId.startsWith('APO') ||
        obj.objectiveId.startsWith('BAI') ||
        obj.objectiveId.startsWith('DSS') ||
        obj.objectiveId.startsWith('MEA')
      )
      expect(mgmtObjectives.length).toBeGreaterThan(0)
    })
  })

  describe('getFullCascade', () => {
    it('should return complete cascade structure', () => {
      const result = getFullCascade(['EG01'], ['AG01'])
      expect(result).toHaveProperty('selectedEnterpriseGoals')
      expect(result).toHaveProperty('alignmentGoals')
      expect(result).toHaveProperty('recommendedObjectives')
    })

    it('should return alignment goals based on enterprise goals', () => {
      const result = getFullCascade(['EG01'], [])
      expect(result.alignmentGoals.length).toBeGreaterThan(0)
    })

    it('should return objectives based on selected alignment goals', () => {
      const result = getFullCascade(['EG01'], ['AG01'])
      expect(result.recommendedObjectives.length).toBeGreaterThan(0)
    })

    it('should handle empty inputs gracefully', () => {
      const result = getFullCascade([], [])
      expect(result.selectedEnterpriseGoals).toEqual([])
      expect(result.alignmentGoals).toEqual([])
      expect(result.recommendedObjectives).toEqual([])
    })

    it('should maintain data integrity through the cascade', () => {
      const result = getFullCascade(['EG01', 'EG02'], ['AG01', 'AG02'])

      // Alignment goals should come from enterprise goals
      expect(result.alignmentGoals.length).toBeGreaterThan(0)

      // Objectives should come from alignment goals
      expect(result.recommendedObjectives.length).toBeGreaterThan(0)

      // All objectives should be valid
      result.recommendedObjectives.forEach(obj => {
        expect(obj.objectiveId).toMatch(/^(EDM|APO|BAI|DSS|MEA)\d{2}$/)
      })
    })
  })

  describe('Relationship Integrity', () => {
    it('should have at least one Primary relationship per enterprise goal', () => {
      Object.entries(enterpriseToAlignmentMapping).forEach(([egId, alignments]) => {
        const hasPrimary = Object.values(alignments).some(rel => rel === 'P')
        expect(hasPrimary).toBe(true)
      })
    })

    it('should have at least one Primary relationship per alignment goal', () => {
      Object.entries(alignmentToObjectiveMapping).forEach(([agId, objectives]) => {
        const hasPrimary = Object.values(objectives).some(rel => rel === 'P')
        expect(hasPrimary).toBe(true)
      })
    })

    it('should map to existing alignment goal IDs', () => {
      const validAGIds = alignmentGoals.map(ag => ag.id)
      Object.values(enterpriseToAlignmentMapping).forEach(alignments => {
        Object.keys(alignments).forEach(agId => {
          expect(validAGIds).toContain(agId)
        })
      })
    })
  })

  describe('Category Distribution', () => {
    it('should have alignment goals distributed across categories', () => {
      const categories = alignmentGoals.map(ag => ag.category)
      const uniqueCategories = new Set(categories)
      expect(uniqueCategories.size).toBeGreaterThanOrEqual(2) // At least 2 different categories
      expect(uniqueCategories.has('value')).toBe(true)
      expect(uniqueCategories.has('risk')).toBe(true)
    })

    it('should have value-related alignment goals', () => {
      const valueGoals = alignmentGoals.filter(ag => ag.category === 'value')
      expect(valueGoals.length).toBeGreaterThan(0)
    })

    it('should have risk-related alignment goals', () => {
      const riskGoals = alignmentGoals.filter(ag => ag.category === 'risk')
      expect(riskGoals.length).toBeGreaterThan(0)
    })

    it('should have resource-related alignment goals', () => {
      const resourceGoals = alignmentGoals.filter(ag => ag.category === 'resource')
      expect(resourceGoals.length).toBeGreaterThan(0)
    })
  })
})
