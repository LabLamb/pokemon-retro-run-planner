/**
 * Tests for field skills data catalog
 */

import { describe, it, expect } from "vitest";
import {
  FIELD_SKILLS,
  getFieldSkillsForVersionGroup,
  getFieldSkillById,
} from "../field-skills";

describe("field skills catalog", () => {
  it("should contain expected field skills", () => {
    expect(FIELD_SKILLS.length).toBeGreaterThan(0);
    expect(FIELD_SKILLS.some((s) => s.id === "surf")).toBe(true);
    expect(FIELD_SKILLS.some((s) => s.id === "cut")).toBe(true);
    expect(FIELD_SKILLS.some((s) => s.id === "fly")).toBe(true);
  });

  describe("getFieldSkillsForVersionGroup", () => {
    it("should return skills for FireRed/LeafGreen", () => {
      const skills = getFieldSkillsForVersionGroup("firered-leafgreen");
      expect(skills.length).toBeGreaterThan(0);
      expect(skills.some((s) => s.id === "surf")).toBe(true);
      expect(skills.some((s) => s.id === "cut")).toBe(true);
    });

    it("should not return Gen 4 skills for Gen 3 games", () => {
      const skills = getFieldSkillsForVersionGroup("firered-leafgreen");
      expect(skills.some((s) => s.id === "rock-climb")).toBe(false);
      expect(skills.some((s) => s.id === "defog")).toBe(false);
    });

    it("should return empty array for invalid version group", () => {
      const skills = getFieldSkillsForVersionGroup("invalid-version");
      expect(skills.length).toBe(0);
    });
  });

  describe("getFieldSkillById", () => {
    it("should return skill by id", () => {
      const skill = getFieldSkillById("surf");
      expect(skill).toBeDefined();
      expect(skill?.label).toBe("Surf");
      expect(skill?.moveName).toBe("surf");
    });

    it("should return undefined for invalid id", () => {
      const skill = getFieldSkillById("invalid-skill");
      expect(skill).toBeUndefined();
    });
  });
});
