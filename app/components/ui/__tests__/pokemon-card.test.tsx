/**
 * Tests for PokemonCard component
 */

import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PokemonCard } from "../pokemon-card";

describe("PokemonCard", () => {
  it("should render Pokémon name", () => {
    const { getByText } = render(
      <PokemonCard
        name="pikachu"
        sprite="sprite.png"
        types={["electric"]}
        baseHp={35}
        baseAttack={55}
        baseDefense={40}
        baseSpAttack={50}
        baseSpDefense={50}
        baseSpeed={90}
        allLearnableHms={[]}
        tradeEvolutionOnly={false}
      />
    );

    expect(getByText("pikachu")).toBeDefined();
  });

  it("should render types", () => {
    const { getByText } = render(
      <PokemonCard
        name="charizard"
        sprite="sprite.png"
        types={["fire", "flying"]}
        baseHp={78}
        baseAttack={84}
        baseDefense={78}
        baseSpAttack={109}
        baseSpDefense={85}
        baseSpeed={100}
        allLearnableHms={[]}
        tradeEvolutionOnly={false}
      />
    );

    expect(getByText("fire")).toBeDefined();
    expect(getByText("flying")).toBeDefined();
  });

  it("should render stats", () => {
    const { getByText, getAllByText } = render(
      <PokemonCard
        name="mewtwo"
        sprite="sprite.png"
        types={["psychic"]}
        baseHp={106}
        baseAttack={110}
        baseDefense={90}
        baseSpAttack={154}
        baseSpDefense={90}
        baseSpeed={130}
        allLearnableHms={[]}
        tradeEvolutionOnly={false}
      />
    );

    expect(getByText("106")).toBeDefined();
    expect(getByText("110")).toBeDefined();
    expect(getAllByText("90")).toHaveLength(2); // Defense and Special Defense both have 90
    expect(getByText("154")).toBeDefined();
    expect(getByText("130")).toBeDefined();
  });

  it("should render trade evolution badge when applicable", () => {
    const { getByText } = render(
      <PokemonCard
        name="alakazam"
        sprite="sprite.png"
        types={["psychic"]}
        baseHp={55}
        baseAttack={50}
        baseDefense={45}
        baseSpAttack={135}
        baseSpDefense={95}
        baseSpeed={120}
        allLearnableHms={[]}
        tradeEvolutionOnly={true}
      />
    );

    expect(getByText("Trade")).toBeDefined();
  });

  it("should render learnable HMs", () => {
    const { getByText } = render(
      <PokemonCard
        name="lapras"
        sprite="sprite.png"
        types={["water", "ice"]}
        baseHp={130}
        baseAttack={85}
        baseDefense={80}
        baseSpAttack={85}
        baseSpDefense={95}
        baseSpeed={60}
        allLearnableHms={[
          { id: "surf", label: "Surf" },
          { id: "strength", label: "Strength" },
        ]}
        tradeEvolutionOnly={false}
      />
    );

    expect(getByText("Surf")).toBeDefined();
    expect(getByText("Strength")).toBeDefined();
  });

  it("should render sprite image", () => {
    const { getByAltText } = render(
      <PokemonCard
        name="pikachu"
        sprite="https://example.com/pikachu.png"
        types={["electric"]}
        baseHp={35}
        baseAttack={55}
        baseDefense={40}
        baseSpAttack={50}
        baseSpDefense={50}
        baseSpeed={90}
        allLearnableHms={[]}
        tradeEvolutionOnly={false}
      />
    );

    const img = getByAltText("pikachu") as HTMLImageElement;
    expect(img.src).toBe("https://example.com/pikachu.png");
  });

  it("should show placeholder when no sprite", () => {
    const { getByText } = render(
      <PokemonCard
        name="missingno"
        sprite=""
        types={["normal"]}
        baseHp={0}
        baseAttack={0}
        baseDefense={0}
        baseSpAttack={0}
        baseSpDefense={0}
        baseSpeed={0}
        allLearnableHms={[]}
        tradeEvolutionOnly={false}
      />
    );

    expect(getByText("No image")).toBeDefined();
  });
});
