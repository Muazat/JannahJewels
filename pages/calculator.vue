<template>
  <div class="bg-main-bg grid-center grid min-h-screen">
    <div class="mx-auto flex max-w-max flex-col items-center justify-center">
      <main>
        <CalculatorDisplay :pressedKey="pressedKey" />
        <CalculatorBody @display:model-value="keyEmit" />
      </main>
    </div>
  </div>
</template>
<script lang="ts" setup>
const pressedKey = ref("");
const keyEmit = (e: Event) => {
  const targetValue = (e.target as HTMLButtonElement).value;
  pressedKey.value = pressedKey.value.replaceAll("x", "*");
  switch (targetValue) {
    case "DEL":
      pressedKey.value = pressedKey.value.slice(0, -1);
      break;
    case "Reset":
      pressedKey.value = "";
      break;
    case "Enter":
      if (
        pressedKey.value.endsWith("*") ||
        pressedKey.value.endsWith("+") ||
        pressedKey.value.endsWith("-") ||
        pressedKey.value.endsWith("/") ||
        pressedKey.value.endsWith(".")
      ) {
        break;
      }
      pressedKey.value = eval(
        /^0+\D/.test(pressedKey.value)
          ? pressedKey.value.replace(/^0+/, "0")
          : pressedKey.value.replace(/^0+/, "")
      ).toString();
      break;
    case "+":
    case "-":
    case "/":
    case "x":
    case ".":
      const lastChar = pressedKey.value.slice(-1);
      if (
        lastChar === "+" ||
        lastChar === "-" ||
        lastChar === "/" ||
        lastChar === "*" ||
        lastChar === "."
      ) {
        pressedKey.value = pressedKey.value.slice(0, -1) + targetValue;
      } else {
        pressedKey.value += targetValue;
      }
      break;
    default:
      pressedKey.value += targetValue;
      break;
  }
};
</script>
