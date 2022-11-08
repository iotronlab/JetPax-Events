<template>
<v-card tile flat class="mx-auto">

  <div class="wrapper">
    <div class="box" v-for="(event, i) in events" :key="i">
      <EventCardNew :event="event" />
    </div>
    <div class="box">
      2
    </div>
    <div class="box">
      2
    </div>
    <div class="box">
      2
    </div>
  </div>

</v-card>
</template>

<script>
import Draggable from "gsap/Draggable"
import InertiaPlugin from "gsap/InertiaPlugin"

export default {
  name: 'GsapCards',
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

  methods: {
    Render() {
      
      this.$nextTick(() => {
        this.$nextTick(() => {

      const gsap = this.$gsap;
      gsap.registerPlugin(Draggable, InertiaPlugin);

      const boxes = gsap.utils.toArray(".box");
      console.clear();

      let activeElement;
      const loop = horizontalLoop(boxes, {
        paused: true,
        draggable: true,
        center: true,
        onChange: (element, index) => {
          activeElement && activeElement.classList.remove("active");
          element.classList.add("active");
          activeElement = element;
        }
      });
      boxes.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i, {
        duration: 0.8,
        ease: "power1.inOut"
      })));
      function horizontalLoop(items, config) {
        items = gsap.utils.toArray(items);
        config = config || {};
        let timeWrap;
        let proxy;
        let timeOffset = 0;

        const onChange = config.onChange;
        let lastIndex = 0;
        const tl = gsap.timeline({
            repeat: config.repeat,
            onUpdate: onChange && function () {
              const i = tl.closestIndex();
              if (lastIndex !== i) {
                lastIndex = i;
                onChange(items[i], i);
              }
            },
            paused: config.paused,
            defaults: {
              ease: "none"
            },
            onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
          });
          const length = items.length;
          const startX = items[0].offsetLeft;
          const times = [];
          const widths = [];
          const spaceBefore = [];
          const xPercents = [];
          let curIndex = 0;
          const center = config.center;
          const pixelsPerSecond = (config.speed || 1) * 100;
          const snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1);
          const container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode;
          
          const getTotalWidth = () => items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + spaceBefore[0] + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
          let totalWidth = getTotalWidth();
          const populateWidths = () => {
            let b1 = container.getBoundingClientRect();
            let b2;
            items.forEach((el, i) => {
              widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
              xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + gsap.getProperty(el, "xPercent"));
              b2 = el.getBoundingClientRect();
              spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
              b1 = b2;
            });
            gsap.set(items, {
              xPercent: i => xPercents[i]
            });
            totalWidth = getTotalWidth();
          };
          
          const populateOffsets = () => {
            timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
            center && times.forEach((t, i) => {
              times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
            });
          };
          const getClosest = (values, value, wrap) => {
            let d;
            let i = values.length;
            let closest = 1e10;
            let index = 0;
            while (i--) {
              d = Math.abs(values[i] - value);
              if (d > wrap / 2) {
                d = wrap - d;
              }
              if (d < closest) {
                closest = d;
                index = i;
              }
            }
            return index;
          };
          const populateTimeline = () => {
            let i, item, curX, distanceToStart, distanceToLoop;
            tl.clear();
            for (i = 0; i < length; i++) {
              item = items[i];
              curX = xPercents[i] / 100 * widths[i];
              distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
              distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
              tl.to(item, {
                xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
                duration: distanceToLoop / pixelsPerSecond
              }, 0).fromTo(item, {
                xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)
              }, {
                xPercent: xPercents[i],
                duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false
              }, distanceToLoop / pixelsPerSecond).add("label" + i, distanceToStart / pixelsPerSecond);
              times[i] = distanceToStart / pixelsPerSecond;
            }
            timeWrap = gsap.utils.wrap(0, tl.duration());
          };

          const refresh = deep => {
            const progress = tl.progress();
            tl.progress(0, true);
            populateWidths();
            deep && populateTimeline();
            populateOffsets();
            deep && tl.draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true);
          };

        gsap.set(items, {
          x: 0
        });

        populateWidths();
        populateTimeline();
        populateOffsets();
        window.addEventListener("resize", () => refresh(true));
        function toIndex(index, vars) {
          vars = vars || {};
          Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length);
          const newIndex = gsap.utils.wrap(0, length, index);
          let time = times[newIndex];
          if (time > tl.time() !== index > curIndex) {
            
            time += tl.duration() * (index > curIndex ? 1 : -1);
          }
          if (time < 0 || time > tl.duration()) {
            vars.modifiers = {
              time: timeWrap
            };
          }
          curIndex = newIndex;
          vars.overwrite = true;
          gsap.killTweensOf(proxy);
          return tl.tweenTo(time, vars);
        }
        tl.next = vars => toIndex(curIndex + 1, vars);
        tl.previous = vars => toIndex(curIndex - 1, vars);
        tl.current = () => curIndex;
        tl.toIndex = (index, vars) => toIndex(index, vars);
        tl.closestIndex = setCurrent => {
          const index = getClosest(times, tl.time(), tl.duration());
          setCurrent && (curIndex = index);
          return index;
        };
        tl.times = times;
        tl.progress(1, true).progress(0, true);
        if (config.reversed) {
          tl.vars.onReverseComplete();
          tl.reverse();
        }
        if (config.draggable && typeof Draggable === "function") {
          proxy = document.createElement("div");
          let ratio, startProgress;
          const wrap = gsap.utils.wrap(0, 1);

          const align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio));
          const syncIndex = () => tl.closestIndex(true);
          typeof InertiaPlugin === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
          const draggable = Draggable.create(proxy, {
            trigger: items[0].parentNode,
            type: "x",
            onPressInit() {
              gsap.killTweensOf(tl);
              startProgress = tl.progress();
              refresh();
              ratio = 1 / totalWidth;
              gsap.set(proxy, {
                x: startProgress / -ratio
              });
            },
            onDrag: align,
            onThrowUpdate: align,
            inertia: true,
            snap: value => {
              const time = -(value * ratio) * tl.duration();
              const wrappedTime = timeWrap(time);
              const snapTime = times[getClosest(times, wrappedTime, tl.duration())];
                
              let dif = snapTime - wrappedTime;
              Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
              return (time + dif) / tl.duration() / -ratio;
            },
            onRelease: syncIndex,
            onThrowComplete: syncIndex
          })[0];
          tl.draggable = draggable;
        }
        tl.closestIndex(true);
        onChange && onChange(items[curIndex], curIndex);
        return tl;
      }

        })
      })


    }

  },
}
</script>

<style scoped>
.wrapper {
  height: 80%;
  width: 90%;
  margin-left: 5%;
  background: transparent;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.carousel {
  background: blue;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 400px;
  margin: 10px;
  padding: 0;
  position: relative;
  flex-shrink: 0;
  font-size: 21px;
  cursor: pointer;
}

.box.active {
  color: white;
  height: 400px;
}

.prev {
  position: absolute;
  top: 10%;
  left: 15%;
}
.next {
  position: absolute;
  top: 10%;
  right: 15%;
}

.toggle {
  position: absolute;
  top: 10%;
}

.show-overflow {
  overflow: visible;
}
</style>