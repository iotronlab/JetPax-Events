<template>
  <div class="stage">
    <div class="wrapper">
      <div class="ring">
        <div class="carde"></div>
        <div class="carde"></div>
        <div class="carde"></div>
        <div class="carde"></div>
        <div class="carde"></div>
        <div class="carde"></div>
        <div class="carde"></div>
        <div class="carde"></div>
        <div class="carde"></div>
        <div class="carde"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const gsap = this.$gsap
      const card = document.querySelectorAll('.carde')
      const ring = document.querySelectorAll('.ring')

      gsap.set(ring, { rotationY: 180, cursor: 'drag' }) // set initial rotationY so the parallax jump happens off screen
      gsap.set(card, { // apply transform rotations to each image
        rotateY: (i) => getRotate(i),
        transformOrigin: '50% 50% 500px',
        z: -500,
        backgroundImage: (i) => 'url(https://picsum.photos/id/' + (i + 32) + '/600/400/)',
        backgroundPosition: (i) => getBgPos(i),
        backfaceVisibility: 'hidden',
      })
      console.log(card, ring)
      gsap.timeline()
        .from(card, {
          duration: 1.5,
          y: 200,
          opacity: 0,
          stagger: 0.1,
          ease: 'expo'
        })

      function getBgPos(i) { // returns the background-position string to create parallax movement in each image
        return (100 - gsap.utils.wrap(0, 360, gsap.getProperty('.ring', 'rotationY') - 180 - i * 36) / 360 * 500) + 'px 0px';
      }

      function getRotate(i) { // returns the background-position string to create parallax movement in each image
        console.log(i * -36)
        return i * -36;
      }
    }
  },
}
</script>

<style>
.stage,
.ring,
.carde {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.stage {
  overflow: hidden;
  position: absolute;
}

.ring,
.carde,
.wrapper {
  position: absolute;
}

.wrapper {
  perspective: 2000px;
  width: 300px;
  height: 400px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
