<template>
  <div class="canvas-card">
    <canvas
      id="my-canvas"
      width="300"
      height="400"
      style="border: 1px solid #ccc; border-radius: 16px"
      >当前浏览器不支持canvas元素，请升级或更换浏览器！</canvas
    >
  </div>
  <div class="flex-container">
    <button @click="copyCanvas(canvas)">复制</button>
    <button @click="downloadCanvas(canvas)">下载</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

let canvas: HTMLCanvasElement;

onMounted(() => {
  canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") ?? ({} as CanvasRenderingContext2D);

  addBackground(canvas, ctx);
  addText(canvas, ctx, "Hello, Canvas!", {
    font: "16px Arial",
    fillStyle: "black",
    textAlign: "center",
    textBaseline: "middle",
  });
  addImage(canvas, ctx, "./src/assets/images/qrcode.png");
});

function addBackground(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  // 创建径向渐变
  const gradient = ctx.createLinearGradient(
    canvas.width / 2,
    0,
    canvas.width / 2,
    canvas.height
  );
  // 添加颜色停止点
  gradient.addColorStop(0, "#ffd8d7");
  gradient.addColorStop(0.3, "white");

  // 设置填充样式为渐变
  ctx.fillStyle = gradient;

  // 绘制矩形，填充整个画布
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

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
  if (!navigator.clipboard) {
    alert("您的浏览器不支持剪贴板操作");
    return;
  }
  try {
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

async function downloadCanvas(canvas: HTMLCanvasElement) {
  try {
    const dataURL = canvas.toDataURL("image/png");
    const el = document.createElement("a");
    el.href = dataURL;
    el.download = "canvas-card.png";

    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: false,
    });
    el.dispatchEvent(event);
  } catch (err) {
    console.log("下载失败", err);
  }
}
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
