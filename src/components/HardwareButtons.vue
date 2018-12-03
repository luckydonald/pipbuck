<template>
  <div class="hardware">
    <div class="hardware-button" id="stats"><label for="stats">Stats</label></div>
    <div class="hardware-button" id="items"><label for="items">Items</label></div>
    <div class="hardware-button" id="data"> <label for="data"> Data</label></div>
  </div>
</template>

<script>
export default {
  name: 'HardwareButtons',
};
</script>

<style scoped lang="scss">
  .hardware {
    background: #7e6d5b;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
  }
  .hardware-button {
    // background/border
    width: 32px;
    height: 31px;
    background: #000;
    display: inline-block;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    position: relative;
    //position: absolute;
    //bottom: 25px;
    //right: 88px;
    border-radius: 150px;

    label {
      position: absolute;
      text-align: center;
      top: 2rem;
      left: -25%;
      right: -25%;
      width: auto;
      color: #d8c99e;
    }
  }
  .hardware-button.power::before {
    // label
    content: "Power";
    display: block;
    position: absolute;
    right: -29px;
    top: 5px;
    font-size: 8px;
    transform: rotate(5deg);
  }
  .hardware-button::after {
    // yellow led
    content: "";
    display: block;
    width: 22px;
    height: 22px;
    background: radial-gradient(white,yellow,orange,red);
    border-radius: 150px;
    margin-left: 5px;
    margin-top: 6px;
    animation: hardware-button-flicker;
    animation-duration: 4s;
    animation-iteration-count: infinite;
}
@keyframes hardware-button-flicker {
  0% {
    box-shadow: 0 0 5px 0 orange;
  }
  5% {
    box-shadow: 0 0 30px 2px orange;
  }
  60% {
    box-shadow: 0 0 30px 2px orange;
  }
  80% {
    box-shadow: 0 0 10px 0 orange;
  }
  90% {
    box-shadow: 0 0 30px 2px orange;
  }
  100% {
    box-shadow: 0 0 0 0 orange;
  }
}

</style>
