function sketch(p) {
  let width = window.innerWidth;
  let height = window.innerHeight;

  let particles = [];
  let particles2 = [];

  p.setup = () => {
    p.createCanvas(width, height);
    class Particle {
      constructor() {
        this.x = p.random(0, p.width);
        this.y = p.random(0, p.height);
        this.r = p.random(0, 3);

        this.x2 = p.random(0, p.width);
        this.y2 = p.random(0, p.height);
        this.r2 = p.random(0, 2.5);

        this.xSpeed = p.random(-0.05, 0.2);
        this.ySpeed = p.random(-0.05, 0.15);
      }

      // 파티클 크기, 색
      createParticle() {
        p.noStroke();
        p.fill("rgba(0, 0, 0, 0.6)");
        p.circle(this.x, this.y, this.r);
      }
      createParticle2() {
        p.noStroke();
        p.fill("#000");
        p.circle(this.x2, this.y2, this.r2);
      }

      // 파티클이 움직이도록 설정하기
      moveParticle() {
        if (this.x < 0 || this.x > p.width) this.xSpeed *= -1;
        if (this.y < 0 || this.y > p.height) this.ySpeed *= -1;
        this.x += this.xSpeed;
        this.y += this.ySpeed;
      }
      moveParticle2() {
        if (this.x2 < 0 || this.x2 > p.width) this.xSpeed *= -1;
        if (this.y2 < 0 || this.y2 > p.height) this.ySpeed *= -1;
        this.x2 += this.xSpeed;
        this.y2 += this.ySpeed;
      }

      // 특정 거리 안쪽에 위치한 파티클들 사이에 연결선
      joinParticles(paraticles) {
        particles.forEach((element) => {
          let dis = p.dist(this.x, this.y, element.x, element.y);
          if (dis < 87) {
            p.stroke("rgba(0, 0, 0, 0.06)");
            p.line(this.x, this.y, element.x, element.y);
          }
        });
      }
    }

    for (let i = 0; i < p.width / 10; i++) {
      particles.push(new Particle());
      particles2.push(new Particle());
    }
  };

  p.draw = () => {
    p.background("#fff");

    for (let i = 0; i < particles.length; i++) {
      particles[i].createParticle();
      particles2[i].createParticle2();

      particles[i].moveParticle();
      particles2[i].moveParticle2();

      particles[i].joinParticles(particles.slice(i));
      particles2[i].joinParticles(particles2.slice(i));
    }
  };
}

export default sketch;
