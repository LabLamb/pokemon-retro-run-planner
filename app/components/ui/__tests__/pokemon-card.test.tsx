/**
 * Tests for PokemonCard component - Slot-based API
 */

import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  PokemonCard,
  PokemonCardHeader,
  PokemonCardTitle,
  PokemonCardContent,
  PokemonCardHero,
  PokemonCardMedia,
  PokemonCardTypes,
  PokemonCardSkills,
  PokemonCardStats,
  PokemonCardActions,
} from "../pokemon-card";
import { TypeBadgeList } from "../type-badge";
import { PokemonStats } from "../pokemon-stats";
import { FieldSkillsDisplay } from "../field-skills-display";
import { Badge } from "../badge";
import { Button } from "../button";

describe("PokemonCard slot-based components", () => {
  it("should render Pokémon name in title slot", () => {
    const { getByText } = render(
      <PokemonCard>
        <PokemonCardHeader>
          <PokemonCardTitle>pikachu</PokemonCardTitle>
        </PokemonCardHeader>
      </PokemonCard>
    );

    expect(getByText("pikachu")).toBeDefined();
  });

  it("should render types using TypeBadgeList", () => {
    const { getByText } = render(
      <PokemonCard>
        <PokemonCardContent>
          <TypeBadgeList
            types={[
              { id: "fire", label: "Fire" },
              { id: "flying", label: "Flying" },
            ]}
          />
        </PokemonCardContent>
      </PokemonCard>
    );

    expect(getByText("Fire")).toBeDefined();
    expect(getByText("Flying")).toBeDefined();
  });

  it("should render stats using PokemonStats component", () => {
    const { getByText, getAllByText } = render(
      <PokemonCard>
        <PokemonCardContent>
          <PokemonCardStats>
            <PokemonStats
              stats={{
                hp: 106,
                attack: 110,
                defense: 90,
                spAttack: 154,
                spDefense: 90,
                speed: 130,
              }}
            />
          </PokemonCardStats>
        </PokemonCardContent>
      </PokemonCard>
    );

    expect(getByText("106")).toBeDefined();
    expect(getByText("110")).toBeDefined();
    expect(getAllByText("90")).toHaveLength(2);
    expect(getByText("154")).toBeDefined();
    expect(getByText("130")).toBeDefined();
  });

  it("should render trade evolution badge in header", () => {
    const { getByText } = render(
      <PokemonCard>
        <PokemonCardHeader>
          <div className="flex items-center justify-between gap-2">
            <PokemonCardTitle>alakazam</PokemonCardTitle>
            <Badge variant="outline">Trade</Badge>
          </div>
        </PokemonCardHeader>
      </PokemonCard>
    );

    expect(getByText("Trade")).toBeDefined();
    expect(getByText("alakazam")).toBeDefined();
  });

  it("should render learnable HMs in skills slot", () => {
    const { getByText } = render(
      <PokemonCard>
        <PokemonCardContent>
          <PokemonCardSkills>
            <FieldSkillsDisplay
              skills={[
                { id: "surf", label: "Surf" },
                { id: "strength", label: "Strength" },
              ]}
            />
          </PokemonCardSkills>
        </PokemonCardContent>
      </PokemonCard>
    );

    expect(getByText("Surf")).toBeDefined();
    expect(getByText("Strength")).toBeDefined();
  });

  it("should allow flexible composition of all slots", () => {
    const { getByText, getAllByText } = render(
      <PokemonCard>
        <PokemonCardHero backgroundImage="charizard.png">
          <PokemonCardHeader>
            <PokemonCardTitle>charizard</PokemonCardTitle>
            <PokemonCardTypes>
              <Badge variant="outline">Trade</Badge>
              <TypeBadgeList
                types={[
                  { id: "fire", label: "Fire" },
                  { id: "flying", label: "Flying" },
                ]}
              />
            </PokemonCardTypes>
          </PokemonCardHeader>
          <PokemonCardMedia>
            <PokemonCardSkills>
              <FieldSkillsDisplay
                skills={[
                  { id: "fly", label: "Fly" },
                  { id: "strength", label: "Strength" },
                ]}
              />
            </PokemonCardSkills>
          </PokemonCardMedia>
        </PokemonCardHero>
        <PokemonCardContent>
          <PokemonCardStats>
            <PokemonStats
              stats={{
                hp: 78,
                attack: 84,
                defense: 78,
                spAttack: 109,
                spDefense: 85,
                speed: 100,
              }}
            />
          </PokemonCardStats>
          <PokemonCardActions>
            <Button size="sm">Add to Team</Button>
          </PokemonCardActions>
        </PokemonCardContent>
      </PokemonCard>
    );

    expect(getByText("charizard")).toBeDefined();
    expect(getByText("Trade")).toBeDefined();
    expect(getByText("Fire")).toBeDefined();
    expect(getByText("Flying")).toBeDefined();
    expect(getAllByText("78")).toHaveLength(2); // hp and defense both have value 78
    expect(getByText("84")).toBeDefined();
    expect(getByText("109")).toBeDefined();
    expect(getByText("Fly")).toBeDefined();
    expect(getByText("Add to Team")).toBeDefined();
  });
});
