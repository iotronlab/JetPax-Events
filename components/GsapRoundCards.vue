<template>
  <div class="stagex">
  
    <div class="containerx">
        <div class="ringx">
            <div class="imgx"></div>
            <div class="imgx"></div>
            <div class="imgx"></div>
            <div class="imgx"></div>
            <div class="imgx"></div>
            <div class="imgx"></div>
            <div class="imgx"></div>
            <div class="imgx"></div>
            <div class="imgx"></div>
            <div class="imgx"></div>
        </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'GsapRoundCards',
  data() {
    return {
      events: [],
      icons: {

      },
    }
  },

  mounted() {
    this.$axios
      .$get(`events`, { params: { page: 1 } })
      .then((res) => {
        this.events = res.data
        this.Render()
      })
  },

  head() {
      return {
        script: [
          {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
          }
        ],
      }
  },

  methods: {
    Render() {

      this.$nextTick(() => {
        this.$nextTick(() => {

        const gsap = this.$gsap;
        const $ = require( "jquery" )
        let xPos = 0;

        gsap.timeline()
            .set('.ringx', { rotationY:180, cursor:'grab' })
            .set('.imgx',  {
                rotateY: (i)=> i*-36,
                transformOrigin: '50% 50% 500px',
                z: -500,
                backgroundImage:(i)=>'url(https://picsum.photos/id/'+(i+32)+'/600/400/)',
                backgroundPosition:(i)=>getBgPos(i),
                backfaceVisibility:'hidden'
            })    
            .from('.imgx', {
                duration:1.5,
                y:200,
                opacity:0,
                stagger:0.1,
                ease:'expo'
            })
            .add(()=>{
                $('.imgx').on('mouseenter', (e)=>{
                    const current = e.currentTarget;
                    gsap.to('.imgx', {opacity:(i,t)=>(t===current)? 1:0.5, ease:'power3'})
                })
                $('.imgx').on('mouseleave', (e)=>{
                    gsap.to('.imgx', {opacity:1, ease:'power2.inOut'})
                })
            }, '-=0.5')

        $(window).on('mousedown touchstart', dragStart);
        $(window).on('mouseup touchend', dragEnd);
            

        function dragStart(e){ 
            if (e.touches) e.clientX = e.touches[0].clientX;
            xPos = Math.round(e.clientX);
            gsap.set('.ringx', {cursor:'grabbing'})
            $(window).on('mousemove touchmove', drag);
        }


        function drag(e){
            if (e.touches) e.clientX = e.touches[0].clientX;    
            gsap.to('.ringx', {
                rotationY: '-=' +( (Math.round(e.clientX)-xPos)%360 ),
                onUpdate:()=>{ gsap.set('.imgx', { backgroundPosition:(i)=>getBgPos(i) }) }
            });
            xPos = Math.round(e.clientX);
        }

        function dragEnd(e){
            $(window).off('mousemove touchmove', drag);
            gsap.set('.ringx', {cursor:'grab'});
        }

        function getBgPos(i){
            return ( 100-gsap.utils.wrap(0,360,gsap.getProperty('.ringx', 'rotationY')-180-i*36)/360*500 )+'px 0px';
        }

        })
      })
    }
  },
}
</script>

<style scoped>
html, body, .stagex, .ringx, .imgx {
  width: 100% !important;
  height: 300px !important;
  transform-style: preserve-3d !important;
  user-select: none !important;
}

.stagex {
  overflow:hidden !important;
  background:#000;
}

div, svg {
  position: absolute !important;
}

.containerx {
  perspective: 2000px !important;
  width: 100% !important;
  height: 400px !important;
}
</style>
