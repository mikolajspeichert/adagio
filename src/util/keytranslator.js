import frequencies from './frequencies'

const keys = {
  treble: [
    undefined,
    {
      flat: 40,
      natural: 41,
      sharp: 42,
    }, // f3
    {
      flat: 42,
      natural: 43,
      sharp: 44,
    },
    {
      flat: 44,
      natural: 45,
      sharp: 46,
    },
    {
      flat: 46,
      natural: 47,
      sharp: 48,
    },
    {
      flat: 47,
      natural: 48,
      sharp: 49,
    },
    {
      flat: 49,
      natural: 50,
      sharp: 51,
    },
    {
      flat: 51,
      natural: 52,
      sharp: 53,
    },
    {
      flat: 52,
      natural: 53, // 8
      sharp: 54,
    },
    {
      flat: 54,
      natural: 55,
      sharp: 56,
    },
    {
      flat: 56,
      natural: 57,
      sharp: 58,
    },
    {
      flat: 58,
      natural: 59,
      sharp: 60,
    },
    {
      flat: 59,
      natural: 60,
      sharp: 61,
    },
    {
      flat: 61,
      natural: 62,
      sharp: 63,
    },
    {
      flat: 63,
      natural: 64,
      sharp: 65,
    },
    {
      flat: 64,
      natural: 65, // 15
      sharp: 66,
    },
    {
      flat: 66,
      natural: 67,
      sharp: 68,
    },
    {
      flat: 68,
      natural: 69,
      sharp: 70,
    },
    {
      flat: 70,
      natural: 71,
      sharp: 72,
    },
    {
      flat: 71,
      natural: 72,
      sharp: 73,
    },
    {
      flat: 73,
      natural: 74,
      sharp: 75,
    },
    {
      flat: 75,
      natural: 76,
      sharp: 77,
    },
    {
      flat: 76,
      natural: 77, // 22
      sharp: 78,
    },
    {
      flat: 78,
      natural: 79,
      sharp: 80,
    },
    {
      flat: 80,
      natural: 81,
      sharp: 82,
    },
    {
      flat: 82,
      natural: 83,
      sharp: 84,
    },
    {
      flat: 83,
      natural: 84,
      sharp: 85,
    },
    {
      flat: 85,
      natural: 86,
      sharp: 87,
    },
    {
      flat: 87,
      natural: 88,
      sharp: 89,
    },
    {
      flat: 88,
      natural: 89,
      sharp: 90,
    },
    {
      flat: 90,
      natural: 91,
      sharp: 92,
    }, // g7
  ],
  bass: [
    undefined,
    {
      flat: 54,
      natural: 55,
      sharp: 56,
    }, // g4
    {
      flat: 52,
      natural: 53,
      sharp: 54,
    },
    {
      flat: 51,
      natural: 52,
      sharp: 53,
    },
    {
      flat: 49,
      natural: 50,
      sharp: 51,
    },
    {
      flat: 47,
      natural: 48, // 5
      sharp: 49,
    },
    {
      flat: 46,
      natural: 47,
      sharp: 48,
    },
    {
      flat: 44,
      natural: 45,
      sharp: 46,
    },
    {
      flat: 42,
      natural: 43,
      sharp: 44,
    },
    {
      flat: 40,
      natural: 41,
      sharp: 42,
    },
    {
      flat: 39,
      natural: 40, // 10
      sharp: 41,
    },
    {
      flat: 37,
      natural: 38,
      sharp: 39,
    },
    {
      flat: 35,
      natural: 36,
      sharp: 37,
    },
    {
      flat: 34,
      natural: 35,
      sharp: 36,
    },
    {
      flat: 32,
      natural: 33,
      sharp: 34,
    },
    {
      flat: 30,
      natural: 31, // 15
      sharp: 32,
    },
    {
      flat: 28,
      natural: 29,
      sharp: 30,
    },
    {
      flat: 27,
      natural: 28,
      sharp: 29,
    },
    {
      flat: 25,
      natural: 26,
      sharp: 27,
    },
    {
      flat: 23,
      natural: 24,
      sharp: 25,
    },
    {
      flat: 22,
      natural: 23, // 20
      sharp: 24,
    },
    {
      flat: 20,
      natural: 21,
      sharp: 22,
    },
    {
      flat: 18,
      natural: 19,
      sharp: 20,
    },
    {
      flat: 16,
      natural: 17,
      sharp: 18,
    },
    {
      flat: 15,
      natural: 16,
      sharp: 17,
    },
    {
      flat: 13,
      natural: 14,
      sharp: 15,
    },
    {
      flat: 11,
      natural: 12,
      sharp: 13,
    },
    {
      flat: 10,
      natural: 11,
      sharp: 12,
    },
    {
      flat: 8,
      natural: 9,
      sharp: 10,
    },
  ],
}

export default (note, clef) => {
  let borderValue = clef === 'treble' ? 30 : 28
  let type
  if (note <= borderValue) {
    // natural note
    type = 'natural'
  } else if (note <= 2 * borderValue) {
    // sharp note
    type = 'sharp'
    note -= borderValue
  } else {
    // flat note
    type = 'flat'
    note -= 2 * borderValue
  }
  return {
    flat: frequencies[keys[clef][note][type] - 1],
    natural: frequencies[keys[clef][note][type]],
    sharp: frequencies[keys[clef][note][type] + 1],
  }
}
