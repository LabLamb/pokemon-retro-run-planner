/**
 * Manual obtainability overrides for special Pokémon
 * 
 * These Pokémon cannot be obtained through wild encounters and need to be
 * explicitly listed: starters, gifts, fossils, Game Corner prizes, NPC trades, etc.
 */

export const OBTAINABILITY_OVERRIDES: Record<string, string[]> = {
  red: [
    "bulbasaur", // Starter choice
    "charmander", // Starter choice
    "squirtle", // Starter choice
    "eevee", // Gift from rival's sister in Celadon City
    "lapras", // Gift in Silph Co (7F)
    "hitmonlee", // Choice after defeating Fighting Dojo in Saffron City
    "hitmonchan", // Choice after defeating Fighting Dojo in Saffron City
    "omanyte", // Fossil choice from Mt. Moon
    "kabuto", // Fossil choice from Mt. Moon
    "aerodactyl", // Old Amber fossil from Pewter City Museum
    "abra", // Game Corner prize (Celadon City)
    "clefairy", // Game Corner prize (Celadon City)
    "nidoran-f", // Game Corner prize (Celadon City)
    "nidoran-m", // Game Corner prize (Celadon City)
    "dratini", // Game Corner prize (Celadon City)
    "scyther", // Game Corner prize (Celadon City)
    "pinsir", // Game Corner prize (Celadon City)
    "porygon", // Game Corner prize (Celadon City)
    "jynx", // NPC trade in Cerulean City (for Poliwhirl)
    "mr-mime", // NPC trade on Route 2 (for Abra)
    "farfetchd", // NPC trade in Vermilion City (for Spearow)
    "tangela", // NPC trade in Cinnabar Island (for Venonat)
    "seel", // Game Corner prize (Celadon City)
    "lickitung", // NPC trade on Route 18 (for Slowbro)
    "electrode", // Game Corner prize (Celadon City)
  ],

  blue: [
    "bulbasaur", // Starter choice
    "charmander", // Starter choice
    "squirtle", // Starter choice
    "eevee", // Gift from rival's sister in Celadon City
    "lapras", // Gift in Silph Co (7F)
    "hitmonlee", // Choice after defeating Fighting Dojo in Saffron City
    "hitmonchan", // Choice after defeating Fighting Dojo in Saffron City
    "omanyte", // Fossil choice from Mt. Moon
    "kabuto", // Fossil choice from Mt. Moon
    "aerodactyl", // Old Amber fossil from Pewter City Museum
    "abra", // Game Corner prize (Celadon City)
    "clefairy", // Game Corner prize (Celadon City)
    "nidoran-f", // Game Corner prize (Celadon City)
    "nidoran-m", // Game Corner prize (Celadon City)
    "dratini", // Game Corner prize (Celadon City)
    "scyther", // Game Corner prize (Celadon City)
    "pinsir", // Game Corner prize (Celadon City)
    "porygon", // Game Corner prize (Celadon City)
    "jynx", // NPC trade in Cerulean City (for Poliwhirl)
    "mr-mime", // NPC trade on Route 2 (for Abra)
    "farfetchd", // NPC trade in Vermilion City (for Spearow)
    "tangela", // NPC trade in Cinnabar Island (for Venonat)
    "seel", // Game Corner prize (Celadon City)
    "lickitung", // NPC trade on Route 18 (for Slowbro)
    "electrode", // Game Corner prize (Celadon City)
  ],

  green: [
    "bulbasaur", // Starter choice
    "charmander", // Starter choice
    "squirtle", // Starter choice
    "eevee", // Gift from rival's sister in Celadon City
    "lapras", // Gift in Silph Co (7F)
    "hitmonlee", // Choice after defeating Fighting Dojo in Saffron City
    "hitmonchan", // Choice after defeating Fighting Dojo in Saffron City
    "omanyte", // Fossil choice from Mt. Moon
    "kabuto", // Fossil choice from Mt. Moon
    "aerodactyl", // Old Amber fossil from Pewter City Museum
    "abra", // Game Corner prize (Celadon City)
    "clefairy", // Game Corner prize (Celadon City)
    "nidoran-f", // Game Corner prize (Celadon City)
    "nidoran-m", // Game Corner prize (Celadon City)
    "dratini", // Game Corner prize (Celadon City)
    "scyther", // Game Corner prize (Celadon City)
    "pinsir", // Game Corner prize (Celadon City)
    "porygon", // Game Corner prize (Celadon City)
    "jynx", // NPC trade in Cerulean City (for Poliwhirl)
    "mr-mime", // NPC trade on Route 2 (for Abra)
    "farfetchd", // NPC trade in Vermilion City (for Spearow)
    "tangela", // NPC trade in Cinnabar Island (for Venonat)
    "seel", // Game Corner prize (Celadon City)
    "lickitung", // NPC trade on Route 18 (for Slowbro)
    "electrode", // Game Corner prize (Celadon City)
  ],

  yellow: [
    "pikachu", // Starter Pokémon
    "bulbasaur", // Gift from girl in Cerulean City (if Pikachu happiness is high)
    "charmander", // Gift from trainer on Route 24 (if Pikachu happiness is high)
    "squirtle", // Gift from Officer Jenny in Vermilion City (if Pikachu happiness is high)
    "eevee", // Gift in Celadon City mansion
    "lapras", // Gift in Silph Co (7F)
    "hitmonlee", // Choice after defeating Fighting Dojo in Saffron City
    "hitmonchan", // Choice after defeating Fighting Dojo in Saffron City
    "magikarp", // Purchase from salesman on Route 4
    "omanyte", // Fossil choice from Mt. Moon
    "kabuto", // Fossil choice from Mt. Moon
    "aerodactyl", // Old Amber fossil from Pewter City Museum
    "abra", // Game Corner prize (Celadon City)
    "clefairy", // Game Corner prize (Celadon City)
    "nidoran-f", // Game Corner prize (Celadon City)
    "nidoran-m", // Game Corner prize (Celadon City)
    "dratini", // Game Corner prize (Celadon City)
    "scyther", // Game Corner prize (Celadon City)
    "pinsir", // Game Corner prize (Celadon City)
    "porygon", // Game Corner prize (Celadon City)
    "farfetchd", // NPC trade in Vermilion City (for Spearow)
    "mr-mime", // NPC trade on Route 2 (for Clefairy)
    "jynx", // NPC trade in Cerulean City (for Poliwhirl)
    "lickitung", // NPC trade on Route 18 (for Slowbro)
    "electrode", // Game Corner prize (Celadon City)
    "tangela", // Game Corner prize (Celadon City)
    "seel", // Game Corner prize (Celadon City)
    "machamp", // NPC trade in Cinnabar Island (for Cubone) - receives Machamp directly!
  ],

  gold: [
    "cyndaquil", // Starter choice
    "totodile", // Starter choice
    "chikorita", // Starter choice
    "eevee", // Gift from Bill in Goldenrod City
    "togepi", // Egg from Professor Elm's assistant
    "tyrogue", // Gift from Karate King in Mt. Mortar
    "spearow", // Gift from Webster on Route 31
    "shuckle", // Gift from Shuckle Guy in Cianwood City
    "kabuto", // Fossil choice from Pewter City Museum
    "omanyte", // Fossil choice from Pewter City Museum
    "aerodactyl", // Old Amber fossil from Pewter City Museum
    "abra", // Game Corner prize (Celadon City)
    "ekans", // Game Corner prize (Celadon City) - Gold exclusive
    "vulpix", // NPC trade in Violet City (for Growlithe)
    "dratini", // Game Corner prize (Celadon City) OR Gift from Dragon's Den elder
    "onix", // NPC trade in Violet City (for Bellsprout)
    "machop", // NPC trade in Goldenrod City (for Drowzee)
    "haunter", // NPC trade in Olivine City (for Xatu)
    "dugtrio", // NPC trade in Route 2 (for Magneton)
  ],

  silver: [
    "cyndaquil", // Starter choice
    "totodile", // Starter choice
    "chikorita", // Starter choice
    "eevee", // Gift from Bill in Goldenrod City
    "togepi", // Egg from Professor Elm's assistant
    "tyrogue", // Gift from Karate King in Mt. Mortar
    "spearow", // Gift from Webster on Route 31
    "shuckle", // Gift from Shuckle Guy in Cianwood City
    "kabuto", // Fossil choice from Pewter City Museum
    "omanyte", // Fossil choice from Pewter City Museum
    "aerodactyl", // Old Amber fossil from Pewter City Museum
    "abra", // Game Corner prize (Celadon City)
    "ekans", // Game Corner prize (Celadon City)
    "vulpix", // NPC trade in Violet City (for Growlithe)
    "dratini", // Game Corner prize (Celadon City) OR Gift from Dragon's Den elder
    "onix", // NPC trade in Violet City (for Bellsprout)
    "machop", // NPC trade in Goldenrod City (for Drowzee)
    "haunter", // NPC trade in Olivine City (for Xatu)
    "dugtrio", // NPC trade in Route 2 (for Magneton)
  ],

  crystal: [
    "cyndaquil", // Starter choice
    "totodile", // Starter choice
    "chikorita", // Starter choice
    "eevee", // Gift from Bill in Goldenrod City
    "togepi", // Egg from Professor Elm's assistant
    "tyrogue", // Gift from Karate King in Mt. Mortar
    "spearow", // Gift from Webster on Route 31
    "shuckle", // Gift from Shuckle Guy in Cianwood City
    "kabuto", // Fossil choice from Pewter City Museum
    "omanyte", // Fossil choice from Pewter City Museum
    "aerodactyl", // Old Amber fossil from Pewter City Museum
    "abra", // Game Corner prize (Celadon City)
    "ekans", // Game Corner prize (Celadon City)
    "vulpix", // NPC trade in Violet City (for Growlithe)
    "dratini", // Game Corner prize (Celadon City) OR Gift from Dragon's Den elder
    "onix", // NPC trade in Violet City (for Bellsprout)
    "machop", // NPC trade in Goldenrod City (for Drowzee)
    "haunter", // NPC trade in Olivine City (for Xatu)
    "dugtrio", // NPC trade in Route 2 (for Magneton)
    "pichu", // Egg breeding from Pikachu/Raichu
    "cleffa", // Egg breeding from Clefairy/Clefable
    "igglybuff", // Egg breeding from Jigglypuff/Wigglytuff
    "smoochum", // Egg breeding from Jynx (Odd Egg gift from Day Care)
    "elekid", // Egg breeding from Electabuzz (Odd Egg gift from Day Care)
    "magby", // Egg breeding from Magmar (Odd Egg gift from Day Care)
  ],

  ruby: [
    "treecko", // Starter choice
    "torchic", // Starter choice
    "mudkip", // Starter choice
    "beldum", // Gift from Steven after defeating Elite Four
    "castform", // Gift in Weather Institute
    "wynaut", // Egg from Lavaridge Town woman
    "lileep", // Fossil choice from Route 111 desert
    "anorith", // Fossil choice from Route 111 desert
    "makuhita", // Gift from Wally's father in Verdanturf Town
    "haunter", // NPC trade in Slateport City (for Ralts)
    "meowth", // NPC trade in Fortree City (for Skitty)
  ],

  sapphire: [
    "treecko", // Starter choice
    "torchic", // Starter choice
    "mudkip", // Starter choice
    "beldum", // Gift from Steven after defeating Elite Four
    "castform", // Gift in Weather Institute
    "wynaut", // Egg from Lavaridge Town woman
    "lileep", // Fossil choice from Route 111 desert
    "anorith", // Fossil choice from Route 111 desert
    "makuhita", // Gift from Wally's father in Verdanturf Town
    "haunter", // NPC trade in Slateport City (for Ralts)
    "meowth", // NPC trade in Fortree City (for Skitty)
  ],

  emerald: [
    "treecko", // Starter choice
    "torchic", // Starter choice
    "mudkip", // Starter choice
    "beldum", // Gift from Steven after defeating Elite Four
    "castform", // Gift in Weather Institute
    "wynaut", // Egg from Lavaridge Town woman
    "lileep", // Fossil choice from Route 111 desert
    "anorith", // Fossil choice from Route 111 desert
    "abra", // Game Corner prize (Mauville City)
    "ditto", // Game Corner prize (Mauville City)
    "pikachu", // Game Corner prize (Mauville City)
    "larvitar", // Gift from Game Freak after completing Hoenn Dex
    "makuhita", // Gift from Wally's father in Verdanturf Town
    "haunter", // NPC trade in Slateport City (for Ralts)
    "meowth", // NPC trade in Fortree City (for Skitty)
    "skitty", // NPC trade in Rustboro City (for Pikachu)
  ],

  firered: [
    "bulbasaur", // Starter choice
    "charmander", // Starter choice
    "squirtle", // Starter choice
    "eevee", // Gift from rival's sister in Celadon City
    "lapras", // Gift in Silph Co (7F)
    "hitmonlee", // Choice after defeating Fighting Dojo in Saffron City
    "hitmonchan", // Choice after defeating Fighting Dojo in Saffron City
    "togepi", // Egg from Mr. Pokémon on Water Path (postgame)
    "omanyte", // Fossil choice from Mt. Moon
    "kabuto", // Fossil choice from Mt. Moon
    "aerodactyl", // Old Amber fossil from Pewter City Museum
    "abra", // Game Corner prize (Celadon City)
    "clefairy", // Game Corner prize (Celadon City)
    "dratini", // Game Corner prize (Celadon City)
    "scyther", // Game Corner prize (Celadon City)
    "pinsir", // Game Corner prize (Celadon City)
    "porygon", // Game Corner prize (Celadon City)
    "jynx", // NPC trade in Cerulean City (for Poliwhirl)
    "mr-mime", // NPC trade on Route 2 (for Abra)
    "farfetchd", // NPC trade in Vermilion City (for Spearow)
    "tangela", // NPC trade in Cinnabar Island (for Venonat)
    "seel", // Game Corner prize (Celadon City)
    "lickitung", // NPC trade on Route 18 (for Golduck)
    "electrode", // Game Corner prize (Celadon City)
  ],

  leafgreen: [
    "bulbasaur", // Starter choice
    "charmander", // Starter choice
    "squirtle", // Starter choice
    "eevee", // Gift from rival's sister in Celadon City
    "lapras", // Gift in Silph Co (7F)
    "hitmonlee", // Choice after defeating Fighting Dojo in Saffron City
    "hitmonchan", // Choice after defeating Fighting Dojo in Saffron City
    "togepi", // Egg from Mr. Pokémon on Water Path (postgame)
    "omanyte", // Fossil choice from Mt. Moon
    "kabuto", // Fossil choice from Mt. Moon
    "aerodactyl", // Old Amber fossil from Pewter City Museum
    "abra", // Game Corner prize (Celadon City)
    "clefairy", // Game Corner prize (Celadon City)
    "dratini", // Game Corner prize (Celadon City)
    "scyther", // Game Corner prize (Celadon City)
    "pinsir", // Game Corner prize (Celadon City)
    "porygon", // Game Corner prize (Celadon City)
    "jynx", // NPC trade in Cerulean City (for Poliwhirl)
    "mr-mime", // NPC trade on Route 2 (for Abra)
    "farfetchd", // NPC trade in Vermilion City (for Spearow)
    "tangela", // NPC trade in Cinnabar Island (for Venonat)
    "seel", // Game Corner prize (Celadon City)
    "lickitung", // NPC trade on Route 18 (for Golduck)
    "electrode", // Game Corner prize (Celadon City)
  ],

  diamond: [
    "turtwig", // Starter choice
    "chimchar", // Starter choice
    "piplup", // Starter choice
    "eevee", // Gift from Bebe in Hearthome City
    "togepi", // Egg from Cynthia in Eterna City
    "riolu", // Egg from Riley on Iron Island
    "happiny", // Egg from traveling hiker on Route 209
    "cranidos", // Fossil choice from Oreburgh City (Diamond exclusive)
    "shieldon", // Fossil choice from Oreburgh City
    "porygon", // Gift in Veilstone City
    "machop", // NPC trade in Oreburgh City (for Abra)
    "haunter", // NPC trade in Snowpoint City (for Medicham)
    "chatot", // NPC trade in Eterna City (for Buizel)
  ],

  pearl: [
    "turtwig", // Starter choice
    "chimchar", // Starter choice
    "piplup", // Starter choice
    "eevee", // Gift from Bebe in Hearthome City
    "togepi", // Egg from Cynthia in Eterna City
    "riolu", // Egg from Riley on Iron Island
    "happiny", // Egg from traveling hiker on Route 209
    "cranidos", // Fossil choice from Oreburgh City
    "shieldon", // Fossil choice from Oreburgh City (Pearl exclusive)
    "porygon", // Gift in Veilstone City
    "machop", // NPC trade in Oreburgh City (for Abra)
    "haunter", // NPC trade in Snowpoint City (for Medicham)
    "chatot", // NPC trade in Eterna City (for Buizel)
  ],

  platinum: [
    "turtwig", // Starter choice
    "chimchar", // Starter choice
    "piplup", // Starter choice
    "eevee", // Gift from Bebe in Hearthome City
    "togepi", // Egg from Cynthia in Eterna City
    "riolu", // Egg from Riley on Iron Island
    "happiny", // Egg from traveling hiker on Route 209
    "cranidos", // Fossil choice from Oreburgh City
    "shieldon", // Fossil choice from Oreburgh City
    "porygon", // Gift in Veilstone City
    "machop", // NPC trade in Oreburgh City (for Abra)
    "haunter", // NPC trade in Snowpoint City (for Medicham)
    "chatot", // NPC trade in Eterna City (for Buizel)
  ],

  heartgold: [
    "cyndaquil", // Starter choice
    "totodile", // Starter choice
    "chikorita", // Starter choice
    "eevee", // Gift from Bill in Goldenrod City
    "togepi", // Egg from Professor Elm's assistant in Violet City
    "tyrogue", // Gift from Karate King in Mt. Mortar
    "dratini", // Gift from Dragon's Den elder after passing quiz
    "shuckle", // Gift from Shuckle Guy in Cianwood City
    "kabuto", // Fossil choice from Pewter City Museum
    "omanyte", // Fossil choice from Pewter City Museum
    "aerodactyl", // Old Amber fossil from Pewter City Museum
    "onix", // NPC trade in Violet City (for Bellsprout)
    "machop", // NPC trade in Goldenrod City (for Drowzee)
    "haunter", // NPC trade in Olivine City (for Xatu)
    "dugtrio", // NPC trade in Route 2 (for Magneton)
  ],

  soulsilver: [
    "cyndaquil", // Starter choice
    "totodile", // Starter choice
    "chikorita", // Starter choice
    "eevee", // Gift from Bill in Goldenrod City
    "togepi", // Egg from Professor Elm's assistant in Violet City
    "tyrogue", // Gift from Karate King in Mt. Mortar
    "dratini", // Gift from Dragon's Den elder after passing quiz
    "shuckle", // Gift from Shuckle Guy in Cianwood City
    "kabuto", // Fossil choice from Pewter City Museum
    "omanyte", // Fossil choice from Pewter City Museum
    "aerodactyl", // Old Amber fossil from Pewter City Museum
    "onix", // NPC trade in Violet City (for Bellsprout)
    "machop", // NPC trade in Goldenrod City (for Drowzee)
    "haunter", // NPC trade in Olivine City (for Xatu)
    "dugtrio", // NPC trade in Route 2 (for Magneton)
  ],

  black: [
    "snivy", // Starter choice
    "tepig", // Starter choice
    "oshawott", // Starter choice
    "zorua", // Gift from N's childhood friend in Driftveil City
    "victini", // Event-only legendary (postgame Liberty Pass event)
    "tirtouga", // Fossil choice from Lenora in Nacrene City
    "archen", // Fossil choice from Lenora in Nacrene City
    "pansage", // Gift in Dreamyard (if you chose Tepig)
    "pansear", // Gift in Dreamyard (if you chose Oshawott)
    "panpour", // Gift in Dreamyard (if you chose Snivy)
    "cottonee", // NPC trade in Nacrene City (for Petilil) - Black exclusive
    "basculin", // NPC trade on Route 5 (for Minccino)
    "minccino", // Gift from NPC in Shopping Mall Nine
  ],

  white: [
    "snivy", // Starter choice
    "tepig", // Starter choice
    "oshawott", // Starter choice
    "zorua", // Gift from N's childhood friend in Driftveil City
    "victini", // Event-only legendary (postgame Liberty Pass event)
    "tirtouga", // Fossil choice from Lenora in Nacrene City
    "archen", // Fossil choice from Lenora in Nacrene City
    "pansage", // Gift in Dreamyard (if you chose Tepig)
    "pansear", // Gift in Dreamyard (if you chose Oshawott)
    "panpour", // Gift in Dreamyard (if you chose Snivy)
    "petilil", // NPC trade in Nacrene City (for Cottonee) - White exclusive
    "basculin", // NPC trade on Route 5 (for Minccino)
    "minccino", // Gift from NPC in Shopping Mall Nine
  ],

  "black-2": [
    "snivy", // Starter choice
    "tepig", // Starter choice
    "oshawott", // Starter choice
    "zorua", // Gift in Driftveil City
    "victini", // Event-only legendary (postgame Liberty Pass event)
    "tirtouga", // Fossil choice from Lenora in Nacrene City
    "archen", // Fossil choice from Lenora in Nacrene City
    "shiny-haxorus", // Guaranteed shiny in Nature Preserve
    "shiny-dratini", // Gift from Dragon's Den elder (shiny)
    "pansage", // Gift in Floccesy Town (if you chose Tepig)
    "pansear", // Gift in Floccesy Town (if you chose Oshawott)
    "panpour", // Gift in Floccesy Town (if you chose Snivy)
    "eevee", // Gift from Amanita in Castelia City
    "dratini", // Gift from Dragon's Den elder (normal or shiny)
    "cottonee", // NPC trade in Driftveil City (for Petilil) - Black 2 exclusive
    "basculin", // NPC trade on Route 5 (for Minccino)
    "minccino", // Gift from NPC in Shopping Mall Nine
    "rotom", // Gift in Shopping Mall Nine (postgame)
  ],

  "white-2": [
    "snivy", // Starter choice
    "tepig", // Starter choice
    "oshawott", // Starter choice
    "zorua", // Gift in Driftveil City
    "victini", // Event-only legendary (postgame Liberty Pass event)
    "tirtouga", // Fossil choice from Lenora in Nacrene City
    "archen", // Fossil choice from Lenora in Nacrene City
    "shiny-haxorus", // Guaranteed shiny in Nature Preserve
    "shiny-dratini", // Gift from Dragon's Den elder (shiny)
    "pansage", // Gift in Floccesy Town (if you chose Tepig)
    "pansear", // Gift in Floccesy Town (if you chose Oshawott)
    "panpour", // Gift in Floccesy Town (if you chose Snivy)
    "eevee", // Gift from Amanita in Castelia City
    "dratini", // Gift from Dragon's Den elder (normal or shiny)
    "petilil", // NPC trade in Driftveil City (for Cottonee) - White 2 exclusive
    "basculin", // NPC trade on Route 5 (for Minccino)
    "minccino", // Gift from NPC in Shopping Mall Nine
    "rotom", // Gift in Shopping Mall Nine (postgame)
  ],
};
