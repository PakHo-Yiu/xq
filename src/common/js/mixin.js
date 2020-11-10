export const deletes = {
    data() {
      return {
        start_x: "0", // 触摸时的水平起始位置
        end_x: "0", // 触摸过程中的水平结束位置
      }
    },
    methods: {
       //跳转
    skip() {
        if (this.checkSlide()) {
          this.restSlide();
        } else {
          alert("You click the slide!");
        }
      },
      //滑动开始
      gtouchstart(event) {
        // 记录初始位置
        this.start_x = event.changedTouches[0].clientX;
      },
      //滑动结束
      gtouchend(event) {
        // 当前滑动的父级元素
        let parentElement = event.currentTarget;
        // 记录结束位置
        this.end_x = event.changedTouches[0].clientX;
        // 左滑
        if (parentElement.dataset.type == 0 && this.start_x - this.end_x > 30) {
          this.restSlide();
          parentElement.dataset.type = 1;
        }
        // 右滑
        if (parentElement.dataset.type == 1 && this.start_x - this.end_x < -30) {
          this.restSlide();
          parentElement.dataset.type = 0;
        }
        this.start_x = 0;
        this.end_x = 0;
      },
      //判断当前是否有滑块处于滑动状态
      checkSlide() {
        let listItems = document.querySelectorAll(".message-item");
        for (let i = 0; i < listItems.length; i++) {
          if (listItems[i].dataset.type == 1) {
            return true;
          }
        }
        return false;
      },
      //复位滑动状态
      restSlide() {
        let listItems = document.querySelectorAll(".message-item");
        // 复位
        for (let i = 0; i < listItems.length; i++) {
          listItems[i].dataset.type = 0;
        }
      }
    }
  }