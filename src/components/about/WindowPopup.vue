<template>
    <div id="charDiv">
      test
    </div>
</template>

<script>

// import Chart from "@/components/about/Chart";

// function copyStyles(sourceDoc, targetDoc) {
//   Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
//     if (styleSheet.cssRules) {
//       const newStyleEl = sourceDoc.createElement("style");
//
//       Array.from(styleSheet.cssRules).forEach((cssRule) => {
//         newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
//       });
//
//       targetDoc.head.appendChild(newStyleEl);
//     } else if (styleSheet.href) {
//       const newLinkEl = sourceDoc.createElement("link");
//
//       newLinkEl.rel = "stylesheet";
//       newLinkEl.href = styleSheet.href;
//       targetDoc.head.appendChild(newLinkEl);
//     }
//   });
// }

export default {
  model: {
    prop: "open",
    event: "close",
  },
  // components: {
  //   Chart,
  // },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.open) {
      this.openPopup();
    }
  },
  beforeDestroy() {
    if (this.windowRef) {
      this.closePopup();
    }
  },
  data() {
    return {
      windowRef: null,
    };
  },
  watch: {
    open: {
      deep: true,
      handler(newVal) {
        console.log(newVal)
        if (newVal) {
          this.openPopup();
        } else {
          this.closePopup();
        }
      }
    },
    // open(newOpen) {
    //   if (newOpen) {
    //     this.openPopup();
    //   } else {
    //     this.closePopup();
    //   }
    // },
  },
  methods: {
    openPopup() {
      var chartDivId = document.getElementById("charDiv");
      console.log(chartDivId)
      this.windowRef = window.open(
          "",
          "",
          "width=1050,height=900,left=200,top=200"
      );
      this.windowRef.document.body.appendChild(this.$el);
      // copyStyles(window.document, this.windowRef.document);
      // this.windowRef.addEventListener("beforeunload", this.closePopup);
    },
    closePopup() {
      if (this.windowRef) {
        this.windowRef.close();
        this.windowRef.removeEventListener("beforeunload", this.closePopup);
        this.windowRef = null;
        this.$emit("close", false);  // 부모창의 binding된 open에게 값을 넘김
      }
    },
  },
};
</script>