<template>
  <div>
    <playerHeader/>
    <playerMain  ref="playerMain"/>
    <player ref="player"/>
  </div>
</template>

<script>

import playerHeader from './components/playerHeader'
import playerMain from './components/playerMain'
import player from './components/player'



export default {
  components: {
    playerHeader,
    playerMain,
    player
  }
}
</script>

<style>

</style>
