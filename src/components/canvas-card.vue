<template>
  <div class="canvas-card">
    <canvas
      id="my-canvas"
      width="300"
      height="500"
      style="border: 1px solid #ccc"
    ></canvas>
  </div>
  <div class="flex-container">
    <button @click="copyCanvas(canvas)">复制</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

let canvas: HTMLCanvasElement;

onMounted(() => {
  canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") ?? ({} as CanvasRenderingContext2D);

  addText(canvas, ctx, "Hello, Canvas!", {
    font: "16px Arial",
    fillStyle: "black",
    textAlign: "center",
    textBaseline: "middle",
  });
  addImage(canvas, ctx, "./src/assets/images/qrcode.png");
});

function addText(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  text: string,
  config: {
    font: string;
    fillStyle: string;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
    dx?: number;
    dy?: number;
  }
) {
  const { font, fillStyle, textAlign, textBaseline } = config;
  // 设置文字样式
  ctx.font = font; // 字体大小和类型
  ctx.fillStyle = fillStyle; // 填充颜色
  ctx.textAlign = textAlign; // 水平居中
  ctx.textBaseline = textBaseline; // 垂直居中

  const textWidth = ctx.measureText(text).width;
  const textHeight = parseInt(ctx.font);

  ctx.fillText(text, config.dx || textWidth / 2, config.dy || textHeight / 2);
}

function addImage(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  url: string
) {
  const img = new Image();
  img.src = url;

  img.onload = () => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // 获取图片的原始宽度和高度
    const imgWidth = 100;
    const imgHeight = 100;

    // 计算图片的绘制起点，使其居中
    const dx = (canvasWidth - imgWidth) / 2;
    const dy = (canvasHeight - imgHeight) / 2;

    // 在 canvas 上绘制图片
    ctx?.drawImage(img, dx, dy, imgWidth, imgHeight);
  };

  img.onerror = (e) => {
    console.log(e);
    console.log("图片加载失败");
  };
}

async function copyCanvas(canvas: HTMLCanvasElement) {
  try {
    // const dataURL = canvas.toDataURL("image/png");
    // console.log(dataURL); // 打印 Base64 字符串，用户可以手动复制
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to convert canvas to blob"));
        }
      }, "image/png");
    });

    const clipboard = new ClipboardItem({
      "image/png": blob,
    });
    await navigator.clipboard.write([clipboard]);

    alert("复制成功");
  } catch (err) {
    console.log("复制失败", err);
    alert("复制失败");
  }
}
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
