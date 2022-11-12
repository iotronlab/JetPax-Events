<template>

  <div class="stage" id="stage">
    <div class="wrapper" id="wrapper">
      <div class="ring" id="ring">
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <!-- div v-for="(event, i) in events" :key="i" class="card-item">
          <EventCardNew :event="event" />
        </div -->
      </div>
    </div>
  </div>

</template>

<script>
import Draggable from "gsap/Draggable"

export default {
  data() {
    return {
      events: [],
    }
  },

  mounted() {
    this.$axios
      .$get(`events`, { params: { page: 1 } })
      .then((res) => {
        this.events = res.data
        this.init()
      })
  },

  methods: {
    init() {

      this.$nextTick(() => {
        this.$nextTick(() => {

          const gsap = this.$gsap
          gsap.registerPlugin(Draggable)

          let xPos = 0
          const card = document.querySelectorAll('.card-item')

          const ring = document.getElementById('ring')
          const wrapper = document.getElementById('wrapper')
          const mainContent = document.getElementById('stage')

          gsap.set(ring, { rotationY: 180, cursor: 'drag' })
          gsap.set(card, { 
            rotateY: (i) => getRotate(i),
            transformOrigin: '50% 50% 500px',
            z: -500,
            backfaceVisibility: 'hidden',
          })

          gsap.timeline()
            .from(card, {
              duration: 1.5,
              y: 200,
              opacity: 0,
              stagger: 0.1,
              ease: 'expo'
            })

          Draggable.create(wrapper, {
            trigger: mainContent,
            bounds: {target: mainContent, minX: 0, maxX: 0, top: 0,left: 0, width: 0, height: 0},
            type: "x",
            throwProps: true,
            allowNativeTouchScrolling: true,
            zIndexBoost: true,

            onDragStart: (e) => {
              if (e.touches) e.clientX = e.touches[0].clientX;
              xPos = Math.round(e.clientX);
              gsap.set('.ring', {cursor:'grabbing'})
            },

            onDrag: (e) => {
              if (e.touches) e.clientX = e.touches[0].clientX;
              gsap.to('.ring', {
                rotationY: '-=' +( (Math.round(e.clientX)-xPos)%360 ),
              });
              console.log(xPos, e.clientX)
              xPos = Math.round(e.clientX);
            },

            onDragEnd: (e) => {
              gsap.set('.ring', {cursor:'grab'});
            }
          })

          function getRotate(i) {
            return i * -36;
          }

        })
      })
    }
  },
}
</script>

<style>
.stage,
.ring,
.card-item {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.stage {
  overflow: hidden;
  position: absolute;
}

.ring,
.card-item,
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

.card-item {
  flex-shrink: 0;
  width: 300px;
  height: 300px;
  margin-left: 20px;
  background-color: white;
}
</style>
