import goblinImg from '../img/goblin.png';

export default class Game {
  constructor(field, hole) {
    this.field = document.getElementById(`${field}`);
    this.boxes = [...this.field.querySelectorAll(`.${hole}`)];
    this.activeBox = null;
    this.score = 0;
    this.scoreCounter = document.querySelector('#score');
    this.skips = 0;
    this.skipCounter = document.querySelector('#skip');
    this.hit = false;
    this.gameTimer = null;

    this.boxes.forEach((box) => {
      box.addEventListener('click', (e) => {
        this.addScore(e);
      });
    });

    document.getElementById('btn-start').addEventListener('click', () => {
      this.startGame();
    });
  }

  startGame() {
    this.activeBox = null;
    this.score = 0;
    this.scoreCounter.textContent = this.score;
    this.skips = 0;
    this.skipCounter.textContent = this.skips;
    this.hit = false;
    this.gameTimer = null;

    clearInterval(this.gameTimer);
    this.showGoblinInterval(1000);
  }

  getRandom() {
    const random = Math.floor(Math.random() * this.boxes.length);
    if (random === this.activeBox) {
      this.getRandom();
    } else {
      this.activeBox = random;
      this.boxes[this.activeBox].classList.toggle('active-box');
    }
  }

  showGoblin() {
    if (document.getElementById('goblin')) {
      document.getElementById('goblin').remove();
      this.boxes[this.activeBox].classList.toggle('active-box');
      this.hit = false;
    }

    this.getRandom();
    const goblin = new Image();
    goblin.src = goblinImg;
    goblin.id = 'goblin';
    goblin.classList.add('goblin');
    this.boxes[this.activeBox].appendChild(goblin);
  }

  showGoblinInterval(speed) {
    this.gameTimer = setInterval(() => {
      this.showGoblin();
      setTimeout(() => {
        if (this.hit === false) {
          this.skips += 1;
          this.skipCounter.textContent = this.skips;

          if (this.skips === 5) {
            clearInterval(this.gameTimer);
            alert('Вы проиграли!'); // eslint-disable-line no-alert
          }
        }
      }, speed);
    }, speed);
  }

  addScore(e) {
    if (e.currentTarget.classList.contains('active-box')) {
      this.score += 1;
      this.scoreCounter.textContent = this.score;

      if (this.score === 10) {
        clearInterval(this.gameTimer);
        alert('Вы победили!'); // eslint-disable-line no-alert
      }

      this.boxes[this.activeBox].classList.toggle('active-box');
      document.getElementById('goblin').remove();

      this.hit = true;
    }
  }
}
