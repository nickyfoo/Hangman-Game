const words = [
  "abruptly",
  "absurd",
  "abyss",
  "affix",
  "askew",
  "avenue",
  "awkward",
  "axiom",
  "azure",
  "bagpipes",
  "bandwagon",
  "banjo",
  "bayou",
  "beekeeper",
  "bikini",
  "blitz",
  "blizzard",
  "boggle",
  "bookworm",
  "boxcar",
  "boxful",
  "buckaroo",
  "buffalo",
  "buffoon",
  "buxom",
  "buzzard",
  "buzzing",
  "buzzwords",
  "caliph",
  "cobweb",
  "cockiness",
  "croquet",
  "crypt",
  "curacao",
  "cycle",
  "daiquiri",
  "dirndl",
  "disavow",
  "dizzying",
  "duplex",
  "dwarves",
  "embezzle",
  "equip",
  "espionage",
  "euouae",
  "exodus",
  "faking",
  "fishhook",
  "fixable",
  "fjord",
  "flapjack",
  "flopping",
  "fluffiness",
  "flyby",
  "foxglove",
  "frazzled",
  "frizzled",
  "fuchsia",
  "funny",
  "gabby",
  "galaxy",
  "galvanize",
  "gazebo",
  "giaour",
  "gizmo",
  "glowworm",
  "glyph",
  "gnarly",
  "gnostic",
  "gossip",
  "grogginess",
  "haiku",
  "haphazard",
  "hyphen",
  "iatrogenic",
  "icebox",
  "injury",
  "ivory",
  "ivy",
  "jackpot",
  "jaundice",
  "jawbreaker",
  "jaywalk",
  "jazziest",
  "jazzy",
  "jelly",
  "jigsaw",
  "jinx",
  "jiujitsu",
  "jockey",
  "jogging",
  "joking",
  "jovial",
  "joyful",
  "juicy",
  "jukebox",
  "jumbo",
  "kayak",
  "kazoo",
  "keyhole",
  "khaki",
  "kilobyte",
  "kiosk",
  "kitsch",
  "kiwifruit",
  "klutz",
  "knapsack",
  "larynx",
  "lengths",
  "lucky",
  "luxury",
  "lymph",
  "marquis",
  "matrix",
  "megahertz",
  "microwave",
  "mnemonic",
  "mystify",
  "naphtha",
  "nightclub",
  "nowadays",
  "numbskull",
  "nymph",
  "onyx",
  "ovary",
  "oxidize",
  "oxygen",
  "pajama",
  "peekaboo",
  "phlegm",
  "pixel",
  "pizazz",
  "pneumonia",
  "polka",
  "pshaw",
  "psyche",
  "puppy",
  "puzzling",
  "quartz",
  "queue",
  "quips",
  "quixotic",
  "quiz",
  "quizzes",
  "quorum",
  "razzmatazz",
  "rhubarb",
  "rhythm",
  "rickshaw",
  "schnapps",
  "scratch",
  "shiv",
  "snazzy",
  "sphinx",
  "spritz",
  "squawk",
  "staff",
  "strength",
  "strengths",
  "stretch",
  "stronghold",
  "stymied",
  "subway",
  "swivel",
  "syndrome",
  "thriftless",
  "thumbscrew",
  "topaz",
  "transcript",
  "transgress",
  "transplant",
  "triphthong",
  "twelfth",
  "twelfths",
  "unknown",
  "unworthy",
  "unzip",
  "uptown",
  "vaporize",
  "vixen",
  "vodka",
  "voodoo",
  "vortex",
  "voyeurism",
  "walkway",
  "waltz",
  "wave",
  "wavy",
  "waxy",
  "wellspring",
  "wheezy",
  "whiskey",
  "whizzing",
  "whomever",
  "wimpy",
  "witchcraft",
  "wizard",
  "woozy",
  "wristwatch",
  "wyvern",
  "xylophone",
  "yachtsman",
  "yippee",
  "yoked",
  "youthful",
  "yummy",
  "zephyr",
  "zigzag",
  "zigzagging",
  "zilch",
  "zipper",
  "zodiac",
  "zombie",
];

let index = 0;
let wordmask = 0;
let guessed = 0;
let numGuesses = 1;
let alive = true;

function charIndex(c) {
  return c.charCodeAt(0) - "A".charCodeAt(0);
}

function updateWord() {
  let newDisplay = "";
  let first = true;
  for (var char of words[index]) {
    if (first) first = false;
    else newDisplay += " ";

    if (guessed & (1 << charIndex(char))) {
      newDisplay += char;
    } else {
      newDisplay += "_";
    }
  }
  document.getElementById("wordDisplay").innerHTML = newDisplay;
}

function handleLoss() {
  alive = false;
  document.getElementById("wordDisplay").innerHTML +=
    "<br>Oops, you lost. The word was: " + words[index];
}

function handleWin() {
  alive = false;
  document.getElementById("wordDisplay").innerHTML +=
    "<br>Hooray, you won! The word was: " + words[index];
}

function guess(letter) {
  if (!alive) return;

  const letterButton = document.getElementById(letter);
  letterButton.disabled = true;

  guessed |= 1 << charIndex(letter);

  // guess not in the word
  if (!(wordmask & (1 << charIndex(letter)))) {
    draw(parts[numGuesses++]);
    if (numGuesses == parts.length) handleLoss();
  } else {
    updateWord();
    if ((wordmask & guessed) == wordmask) handleWin();
  }
}

function generateWord() {
  index = Math.floor(Math.random() * words.length);
  console.log(words[index]);

  for (var c of words[index]) {
    wordmask |= 1 << charIndex(c);
  }

  document.getElementById("wordDisplay").innerHTML = words[index]
    .split("")
    .map((c) => "_")
    .join(" ");
}

function generateKeyboard() {
  let buttonHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map(
      (letter) =>
        `<button id="` +
        letter +
        `" onclick="guess('` +
        letter +
        `')">` +
        letter +
        `</button>`
    )
    .join("");

  document.getElementById("keyboard").innerHTML = buttonHTML;
}

const canvas = document.getElementById("hangman");
const context = canvas.getContext("2d");

function draw(shape) {
  switch (shape) {
    case "gallows":
      context.beginPath();
      context.lineWidth = 5;
      context.moveTo(195, 195);
      context.lineTo(0, 195);
      context.moveTo(15, 195);
      context.lineTo(15, 5);
      context.lineTo(150, 5);
      context.moveTo(100, 5);
      context.lineTo(100, 25);
      context.stroke();
      break;
    case "head":
      context.beginPath();
      context.arc(100, 50, 25, 0, Math.PI * 2, true);
      context.stroke();
      break;
    case "body":
      context.beginPath();
      context.moveTo(100, 75);
      context.lineTo(100, 150);
      context.stroke();
      break;
    case "lefthand":
      context.beginPath();
      context.moveTo(100, 90);
      context.lineTo(60, 100);
      context.stroke();
      break;
    case "righthand":
      context.beginPath();
      context.moveTo(100, 90);
      context.lineTo(140, 100);
      context.stroke();
      break;
    case "leftleg":
      context.beginPath();
      context.moveTo(100, 150);
      context.lineTo(60, 175);
      context.stroke();
      break;
    case "rightleg":
      context.beginPath();
      context.moveTo(100, 150);
      context.lineTo(140, 175);
      context.stroke();
      break;
  }
}

const parts = [
  "gallows",
  "head",
  "body",
  "lefthand",
  "righthand",
  "leftleg",
  "rightleg",
];

function reset() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  alive = true;
  wordmask = 0;
  guessed = 0;
  numGuesses = 1;
  draw("gallows");
  generateWord();
  generateKeyboard();
}

reset();
