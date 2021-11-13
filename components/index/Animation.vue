<template>
  <section>
    <canvas></canvas>
  </section>
</template>
<script>
import { GodrayFilter } from '@pixi/filter-godray'
// import { sound } from '@pixi/sound'
export default {
  // data: () => ({
  //   windowSize: {
  //     x: 0,
  //     y: 0,
  //   },
  // }),

  mounted() {
    this.startPixi()
  },
  methods: {
    startPixi() {
      const PIXI = global.PIXI
      // Get the screen width and height
      // Disable interaction plugin (for PixiJS 6)
      // delete PIXI.Renderer.__plugins.interaction

      // PIXI.sound.Sound.from({
      //   url: '@/assets/audios/song.mp3',
      //   autoPlay: true,
      //   complete() {
      //     console.log('Sound finished')
      //   },
      // })
      // console.log(sound)
      // sound.Sound.from({
      //   url: '@/assets/audios/song.mp3',
      // })
      // sound.play('my-sound')
      // sound.add('sound', {
      //   url: '@/assets/audios/song.mp3',
      //   preload: true,
      //   loaded: (err, sound) => {
      //     if (err) {
      //       console.warn(err)
      //     } else {
      //       console.log(`loaded sound  ${sound.duration} seconds`)
      //     }
      //   },
      // })

      const width = window.innerWidth
      const height = window.innerHeight
      const app = new PIXI.Application({
        width,
        height,
        view: document.querySelector('canvas'),
        resizeTo: document.querySelector('canvas'),
        // backgroundAlpha: 0,
        // resolution: devicePixelRatio,
      })
      // app.stop()

      // load resources

      const uniforms = {
        dimensions: { x: width, y: height },
        time: 0,
        alpha: 0,
        speed: {
          x: 0.7,
          y: 0.4,
        },
        shift: 0,
      }

      const fragmentSrc = `
precision mediump float;
uniform vec2      dimensions;
uniform float     time;
uniform float     alpha;
uniform vec2      speed;
uniform float     shift;
varying vec2 vTextureCoord;

float rand(vec2 n) {
 return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 n) {
  const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
  return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float fbm(vec2 n) {
  float total = 0.0, amplitude = 1.0;
  for (int i = 0; i < 4; i++) {
    total += noise(n) * amplitude;
    n += n;
    amplitude *= 0.5;
  }
  return total;
}

void main() {
  const vec3 c1 = vec3(126.0/255.0, 0.0/255.0, 97.0/255.0);
  const vec3 c2 = vec3(173.0/255.0, 0.0/255.0, 161.4/255.0);
  const vec3 c3 = vec3(0.2, 0.0, 0.0);
  const vec3 c4 = vec3(164.0/255.0, 1.0/255.0, 214.4/255.0);
  const vec3 c5 = vec3(0.1);
  const vec3 c6 = vec3(0.9);

  vec2 p = vTextureCoord.xy * 8.0;
  float q = fbm(p - time * 0.1);
  vec2 r = vec2(fbm(p + q + time * speed.x - p.x - p.y), fbm(p + q - time * speed.y));
  vec3 c = mix(c1, c2, fbm(p + r)) + mix(c3, c4, r.x) - mix(c5, c6, r.y);
  float grad = vTextureCoord.y;
  gl_FragColor = vec4(c * cos(shift * vTextureCoord.y), 1.0) * alpha;
  gl_FragColor.xyz *= grad;
}

`
      // Build geometry.
      const geometry = new PIXI.Geometry()
        .addAttribute(
          'aVertexPosition', // the attribute name
          [
            0,
            0, // x, y
            width,
            0, // x, y
            width,
            height,
            0,
            height,
          ], // x, y
          2
        ) // the size of the attribute
        .addAttribute(
          'aTextureCoord', // the attribute name
          [
            0,
            0, // u, v
            1,
            0, // u, v
            1,
            1,
            0,
            1,
          ], // u, v
          2
        ) // the size of the attribute
        .addIndex([0, 1, 2, 0, 2, 3])

      const filter = PIXI.Shader.from(null, fragmentSrc, uniforms)

      const quad = new PIXI.Mesh(geometry, filter)
      // app.stage.filterArea = app.renderer.screen

      app.stage.addChild(quad)
      // const filter = new PIXI.Filter(null, fragmentSrc, uniforms)
      // ray filter
      const rayFilter = new GodrayFilter({
        gain: 0,
        lacunarity: 2.4,
        alpha: 0,
        // angle: 0,
        parallel: false,
        center: {
          x: -100,
          y: -1000,
        },
      })
      app.stage.filters = [rayFilter]
      app.loader
        .add('landing', require('@/assets/images/index/landing.webp'))
        .load((loaderInstance, resources) => {
          const logo = PIXI.Sprite.from(resources.landing.texture)
          // Set it at the center of the screen
          logo.position.set(app.screen.width / 2, app.screen.height / 2) // same as your innerWidth
          logo.anchor.set(0.5)
          // resize image Math.min() to contain
          logo.scale.set(
            Math.max(
              app.screen.width / logo.texture.width,
              app.screen.height / logo.texture.height
            )
          )
          logo.blendMode = PIXI.BLEND_MODES.ADD
          app.stage.addChild(logo)
        })

      // const bg = new PIXI.Container()
      // bg.filterArea = app.renderer.screen
      // //  bg.blendMode = PIXI.BLEND_MODES.ADD

      // bg.filters = [filter, rayFilter]

      // app.stage.addChild(bg)

      let count = 0
      app.ticker.add((delta) => {
        // animation time
        filter.uniforms.time += 0.01 * delta
        rayFilter.time += 0.01 * delta
        // animation graph
        count += 0.005
        const timeWave = Math.sin(count)
        if (timeWave > 0 && timeWave < 0.5) {
          filter.uniforms.alpha = timeWave
          filter.uniforms.shift = timeWave
          rayFilter.uniforms.alpha = timeWave
          rayFilter.uniforms.gain = timeWave
        } else {
          setTimeout(function () {
            filter.uniforms.alpha = Math.random()
            rayFilter.uniforms.alpha = Math.random()
          }, 4000)
        }
        // delta / 60
        // += 0.04 * delta;
        // Read mouse points, this could be done also in mousemove/touchmove update. For simplicity it is done here for now.
        // When implementing this properly, make sure to implement touchmove as interaction plugins mouse might not update on certain devices.
        if (app.renderer.plugins.interaction.eventData.data) {
          const mouseposition =
            app.renderer.plugins.interaction.eventData.data.global
          //  console.log(app.renderer.plugins.interaction.eventData.data)
          rayFilter.center.x = mouseposition.x
        }
      })
    },
  },
}
</script>
