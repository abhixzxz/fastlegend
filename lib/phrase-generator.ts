const SHORT_PHRASES = [
  "The quick brown fox jumps over the lazy dog",
  "Pack my box with five dozen liquor jugs",
  "How vexingly quick daft zebras jump",
  "The five boxing wizards jump quickly",
  "Sphinx of black quartz judge my vow",
  "Two driven jocks help foxy brown jump",
  "Waltz bad nymph for quick jigs vex",
  "Glib jocks quiz nymph to vex dwarf",
  "Jackdaws love my big sphinx of quartz",
  "The jay pig dwarfs the chop on my fork",
]

const MEDIUM_PHRASES = [
  "Technology has revolutionized the way we communicate and work. From smartphones to cloud computing, innovation continues to shape our daily lives in unprecedented ways. The digital transformation is not just about tools but about fundamentally changing how we think and interact.",
  "Learning to type efficiently is a valuable skill in today's digital world. Consistent practice and proper technique can significantly improve your speed and accuracy. Touch typing, where you type without looking at the keyboard, is the gold standard for professional typists.",
  "The internet has transformed global commerce and social interaction. Businesses now operate across borders seamlessly, connecting millions of people worldwide. E-commerce has become a trillion-dollar industry, reshaping retail and consumer behavior.",
  "Artificial intelligence is becoming increasingly integrated into various industries. From healthcare to finance, AI applications are solving complex problems and improving efficiency. Machine learning algorithms can now recognize patterns and make predictions with remarkable accuracy.",
  "Climate change remains one of the most pressing challenges of our time. Scientists worldwide are working on sustainable solutions to reduce carbon emissions and protect our planet. Renewable energy sources like solar and wind power are becoming increasingly viable alternatives.",
  "The human brain is one of the most complex organs in nature. It contains approximately 86 billion neurons that communicate through trillions of connections. Understanding how the brain works is crucial for treating neurological diseases and improving cognitive function.",
  "Reading is one of the most enriching activities a person can engage in. Books transport us to different worlds and introduce us to diverse perspectives. In an age of digital distractions, cultivating a reading habit remains more important than ever.",
  "Music has been an integral part of human culture for thousands of years. It transcends language barriers and connects people across different backgrounds and generations. The science of music reveals its profound effects on our brains and emotional well-being.",
]

const LONG_PHRASES = [
  "The evolution of technology has fundamentally transformed human civilization. From the invention of the printing press to the digital revolution, each innovation has reshaped society in profound ways. Today, we stand at the intersection of artificial intelligence, quantum computing, and biotechnology, where possibilities seem limitless. The future promises even more dramatic changes as these technologies converge and mature. Understanding these developments is crucial for anyone seeking to thrive in the modern world. The pace of technological change is accelerating, with new breakthroughs occurring at an unprecedented rate.",
  "Reading is one of the most enriching activities a person can engage in. Books transport us to different worlds, introduce us to diverse perspectives, and expand our understanding of human experience. Whether fiction or non-fiction, reading stimulates our imagination and critical thinking. In an age of digital distractions, cultivating a reading habit remains more important than ever. The benefits extend beyond entertainment to include improved vocabulary, enhanced focus, and reduced stress. Studies have shown that regular reading can improve cognitive function and even increase longevity.",
  "Music has been an integral part of human culture for thousands of years. It transcends language barriers and connects people across different backgrounds and generations. From classical symphonies to contemporary pop, music expresses emotions and tells stories that words alone cannot convey. The science of music reveals its profound effects on our brains and well-being. Whether as a listener or performer, engaging with music enriches our lives immeasurably. Music therapy has become an established field, helping people recover from trauma and manage chronic pain.",
  "Travel broadens our horizons and challenges our preconceptions about the world. Visiting new places exposes us to different cultures, cuisines, and ways of life. These experiences foster empathy and understanding between people from different backgrounds. Travel also provides opportunities for personal growth and self-discovery. While travel can be challenging, the memories and insights gained make it invaluable for personal development. The world is full of wonders waiting to be explored by curious and adventurous souls.",
  "The importance of physical fitness cannot be overstated in maintaining overall health and well-being. Regular exercise strengthens our bodies, improves cardiovascular health, and enhances mental clarity. Beyond the physical benefits, fitness activities provide opportunities for social connection and stress relief. Establishing a consistent exercise routine requires discipline and commitment, but the long-term rewards are substantial. Whether through sports, gym workouts, or outdoor activities, staying active is essential for a healthy life. Exercise has been shown to reduce the risk of chronic diseases and improve quality of life.",
  "Education is the foundation upon which societies build their future. Quality education empowers individuals with knowledge, skills, and critical thinking abilities necessary to navigate an increasingly complex world. Teachers play a crucial role in shaping young minds and inspiring the next generation of leaders, innovators, and thinkers. Access to education should be a fundamental right for all people, regardless of socioeconomic status or geographic location. The digital revolution has opened new possibilities for distance learning and personalized education. Lifelong learning has become essential in a world where knowledge and skills rapidly become outdated.",
  "Environmental conservation is not just an environmental issue but a moral imperative for humanity. The natural world provides us with clean air, water, food, and countless other resources essential for survival. Deforestation, pollution, and climate change threaten the delicate balance of ecosystems worldwide. Individual actions, when multiplied across millions of people, can create significant positive change. Supporting renewable energy, reducing consumption, and protecting natural habitats are ways we can all contribute. The time to act is now, as the window for preventing catastrophic environmental damage is rapidly closing.",
  "The digital age has brought unprecedented opportunities for connection and collaboration. Social media platforms allow people to share ideas and build communities across geographical boundaries. However, this connectivity also brings challenges including misinformation, privacy concerns, and mental health issues. Finding balance in our digital lives is crucial for maintaining well-being. Critical thinking and media literacy are essential skills for navigating the information landscape. As technology continues to evolve, we must remain thoughtful about how we integrate it into our lives.",
]

export function generatePhrase(duration: number): string {
  let phrases: string[]

  if (duration <= 30) {
    phrases = SHORT_PHRASES
  } else if (duration <= 90) {
    phrases = MEDIUM_PHRASES
  } else {
    phrases = LONG_PHRASES
  }

  return phrases[Math.floor(Math.random() * phrases.length)]
}
