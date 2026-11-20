
const lessonNames = ["Our World","Science in Action","Nature & Environment","Shapes & Measurement","Our Heritage","Growing Things","Digital World","Numbers & Logic","Maps & Places","Creative Expression"];
const lessonDescriptions = [
"Explore the world around us through observation, reading and discussion.",
"Learn through observation, experiments and evidence.",
"Discover ecosystems, biodiversity and ways to protect our environment.",
"Explore mathematical shapes, patterns, measurement and practical problem solving.",
"Learn about history, culture, architecture and the people who shaped our society.",
"Understand plants, growth, sustainability and the natural world.",
"Explore computers, digital literacy, technology and responsible internet use.",
"Practise calculations, reasoning, patterns and everyday mathematics.",
"Understand maps, locations, directions and the geography of our world.",
"Explore art, creativity, visual communication and expressing ideas."
];
const searchInput = document.getElementById("searchInput");
function searchLessons(){
  if(!searchInput) return;
  const q=searchInput.value.trim().toLowerCase();
  const cards=[...document.querySelectorAll("[data-lesson], .lesson-list .info-card")];
  cards.forEach((card,index)=>{
    const n=card.dataset.lesson ? Number(card.dataset.lesson)-1 : index;
    const text=(card.innerText+" "+(lessonNames[n]||"")).toLowerCase();
    card.style.display=!q||text.includes(q)?"":"none";
  });
}
document.getElementById("searchBtn")?.addEventListener("click",searchLessons);
searchInput?.addEventListener("input",searchLessons);

const questions=[
{q:"Which of these is the star closest to Earth?",a:["Sirius","The Sun","Polaris","Vega"],c:1},
{q:"Which part of a plant usually absorbs water from soil?",a:["Flower","Leaf","Root","Fruit"],c:2},
{q:"How many sides does a triangle have?",a:["Three","Four","Five","Six"],c:0},
{q:"Which device is commonly used to type text on a computer?",a:["Monitor","Keyboard","Speaker","Printer"],c:1}
];
let qi=0,score=0,answered=false;
function renderQuestion(){
  const question=document.getElementById("question"),answers=document.getElementById("answers");
  if(!question||!answers)return;
  const q=questions[qi];question.textContent=(qi+1)+". "+q.q;answers.innerHTML="";
  q.a.forEach((answer,index)=>{const b=document.createElement("button");b.className="answer";b.textContent=answer;b.addEventListener("click",()=>chooseAnswer(index,b));answers.appendChild(b)});
  document.getElementById("quizFeedback").textContent="";
  document.getElementById("scoreText").textContent=`Score: ${score} / ${qi}`;
  document.getElementById("nextQuestion").textContent="Next Question →";answered=false;
}
function chooseAnswer(index,button){
  if(answered)return;answered=true;const q=questions[qi];
  document.querySelectorAll(".answer").forEach((b,i)=>{b.disabled=true;if(i===q.c)b.classList.add("correct")});
  if(index===q.c){score++;document.getElementById("quizFeedback").textContent="Correct! Great job. ⭐"}
  else{button.classList.add("wrong");document.getElementById("quizFeedback").textContent="Not quite. The correct answer is "+q.a[q.c]+"."}
  document.getElementById("scoreText").textContent=`Score: ${score} / ${qi+1}`;
  document.getElementById("nextQuestion").textContent=qi===questions.length-1?"Restart Quiz ↻":"Next Question →";
}
document.getElementById("nextQuestion")?.addEventListener("click",()=>{if(qi===questions.length-1){qi=0;score=0}else qi++;renderQuestion()});
renderQuestion();

document.getElementById("feedbackForm")?.addEventListener("submit",e=>{
  e.preventDefault();
  document.getElementById("formMessage").textContent="Thank you! This demo does not send or store submissions. Connect a form service to receive feedback.";
  e.target.reset();
});
