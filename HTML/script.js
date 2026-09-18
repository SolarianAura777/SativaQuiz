/* ============================================================
   QUESTION BANK — EDIT ME
   Replace the question text / options / correctIndex with your
   own real facts about yourself. correctIndex is 0-based
   (0 = first option, 1 = second, etc). 1 point per question.
   With 15 questions the max score is 15, matching the tiers below.
   ============================================================ */
const QUESTIONS = [
  { q: "What's my favourite colour?", options: ["Red", "Pink", "Orange", "Black"], correctIndex: 0 },
  { q: "What's my go-to comfort food?", options: ["Pizza", "Ramen", "Burger", "Chicken Wings"], correctIndex: 0 },
  { q: "What's my star sign?", options: ["Leo", "Pisces", "Gemini", "Capricorn"], correctIndex: 0 },
  { q: "What is my favourite Anime?", options: ["Bleach", "Naruto Shippuden", "Attack on Titan", "Jujutsu Kaisen"], correctIndex: 1 },
  { q: "What's my dream travel destination?", options: ["Japan", "Italy", "Iceland", "Brazil"], correctIndex: 0 },
  { q: "What's my favourite season?", options: ["Winter", "Spring", "Summer", "Autumn"], correctIndex: 2 },
  { q: "What's a hobby I do most weekends?", options: ["Gaming", "Working Out", "Baking", "Sketching"], correctIndex: 1 },
  { q: "What's my favourite movie genre?", options: ["Horror", "Rom-com", "Sci-fi", "Thriller"], correctIndex: 0 },
  { q: "What pet would I most want?", options: ["Dog", "Cat", "Rabbit", "Ferret"], correctIndex: 3 },
  { q: "What's my biggest pet peeve?", options: ["Loud chewing", "Being late", "Messy rooms", "Slow walkers"], correctIndex: 3 },
  { q: "What's my favourite music genre?", options: ["Pop", "Rock", "Hip-Hop", "Classical"], correctIndex: 3 },
  { q: "What subject was I best at in school?", options: ["Maths", "Accounting", "English", "Computer Applications Technology"], correctIndex: 3 },
  { q: "What's my guilty pleasure snack?", options: ["Chips", "Ice cream", "Gummy sweets", "Chocolate"], correctIndex: 2 },
  { q: "How do I take my coffee/tea?", options: ["Black, no sugar", "Milk, no sugar", "Milk & sugar", "I don't drink it"], correctIndex: 3 },
  { q: "What cake do I enjoy?", options: ["Red velvet", "Tiramisu", "Chocolate", "Carrot"], correctIndex: 0 }
];

const TIERS = [
  {
    min: 10, max: 15,
    image: "Images/Celebrate!!.jpg", iconClass: "win",
    title: "YAYYYY!! You know me well!",
    sub: "You really pay attention 💕",
    confetti: true
  },
  {
    min: 5, max: 9,
    image: "Images/ThumbsUp.jpg", iconClass: "",
    title: "Alright, You know me a little bit",
    sub: "Not bad — there's room to grow our friendship!",
    confetti: false
  },
  {
    min: 0, max: 4,
    image: "Images/SadFace.jpg", iconClass: "",
    title: "Damn, you don't know me well at all",
    sub: "We clearly need to hang out more!!!!",
    confetti: false
  }
];

let current = 0;
let score = 0;
const answers = new Array(QUESTIONS.length).fill(null);
 
const screens = {
  intro: document.getElementById('screen-intro'),
  quiz: document.getElementById('screen-quiz'),
  splash: document.getElementById('screen-splash'),
  result: document.getElementById('screen-result')
};
 
function showScreen(name){
  Object.values(screens).forEach(s => s.classList.add('hidden'));
  screens[name].classList.remove('hidden');
}
 
function renderQuestion(){
  const item = QUESTIONS[current];
  document.getElementById('q-text').textContent = item.q;
  document.getElementById('progress-label').textContent = `Q${current + 1} / ${QUESTIONS.length}`;
  document.getElementById('progress-fill').style.width = `${(current / QUESTIONS.length) * 100}%`;
 
  const list = document.getElementById('options');
  list.innerHTML = '';
  item.options.forEach((opt, i) => {
    const li = document.createElement('li');
    li.className = 'option';
    const inputId = `opt-${current}-${i}`;
    li.innerHTML = `
      <input type="radio" name="q${current}" id="${inputId}" value="${i}" ${answers[current] === i ? 'checked' : ''}>
      <label for="${inputId}"><span class="tick"></span> ${opt}</label>
    `;
    list.appendChild(li);
  });
 
  const nextBtn = document.getElementById('next-btn');
  nextBtn.disabled = answers[current] === null;
  nextBtn.textContent = current === QUESTIONS.length - 1 ? 'See my score 🎉' : 'Next →';
 
  list.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', (e) => {
      answers[current] = parseInt(e.target.value, 10);
      nextBtn.disabled = false;
    });
  });
}
 
document.getElementById('start-btn').addEventListener('click', () => {
  current = 0;
  showScreen('quiz');
  renderQuestion();
});
 
document.getElementById('next-btn').addEventListener('click', () => {
  if (current < QUESTIONS.length - 1){
    current++;
    renderQuestion();
  } else {
    finishQuiz();
  }
});
 
function finishQuiz(){
  showScreen('splash');
  setTimeout(() => {
    score = answers.reduce((total, ans, i) => {
      return total + (ans === QUESTIONS[i].correctIndex ? 1 : 0);
    }, 0);
    showResult();
  }, 1400);
}
 
function showResult(){
  const tier = TIERS.find(t => score >= t.min && score <= t.max) || TIERS[TIERS.length - 1];
 
  const iconEl = document.getElementById('result-icon');
  iconEl.src = tier.image;
  iconEl.alt = tier.title;
  iconEl.className = `result-icon ${tier.iconClass}`;
 
  document.getElementById('score-title').textContent = tier.title;
  document.getElementById('score-sub').textContent = tier.sub;
  document.getElementById('score-points').textContent = `${score} / ${QUESTIONS.length} points`;
 
  showScreen('result');
 
  if (tier.confetti && window.confetti){
    const duration = 2200;
    const end = Date.now() + duration;
    (function frame(){
      confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0 }, colors: ['#ff6fa5','#8b5cf6','#ffb347','#2fbf8f'] });
      confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1 }, colors: ['#ff6fa5','#8b5cf6','#ffb347','#2fbf8f'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    confetti({ particleCount: 90, spread: 100, origin: { y: 0.6 }, colors: ['#ff6fa5','#8b5cf6','#ffb347','#2fbf8f'] });
  }
}
 
document.getElementById('restart-btn').addEventListener('click', () => {
  current = 0;
  score = 0;
  answers.fill(null);
  showScreen('intro');
});
 
/* a few gentle floating sparkles in the background */
const sparkleEmoji = ['✨','💫','⭐'];
for (let i = 0; i < 10; i++){
  const s = document.createElement('span');
  s.className = 'sparkle';
  s.textContent = sparkleEmoji[i % sparkleEmoji.length];
  s.style.left = `${Math.random() * 100}vw`;
  s.style.top = `${Math.random() * 100}vh`;
  s.style.animationDelay = `${Math.random() * 5}s`;
  s.style.fontSize = `${14 + Math.random() * 16}px`;
  document.body.appendChild(s);
}
 