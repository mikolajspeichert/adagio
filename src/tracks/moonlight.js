const track = {
  name: 'Moonlight sonata',
  author: 'Ludwig van Beethoven',
  tempo: 77,
  key: 'E', // or sth like that
  time: '2/2',
  treble: [
    [
      {
        midi: 60,
        size: 8,
        accidental: null,
        dot: null,
        tie: 12.0,
      },
    ],
  ],
  bass: [
    [
      {
        midi: 41,
        size: 1,
      },
      {
        midi: 0x14,
        size: 1,
      },
    ],
  ],
}

export default track
