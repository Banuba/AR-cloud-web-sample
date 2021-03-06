import { Dom, Webcam, Player, Effect } from '../static/BanubaSDK.js'
import banubaARCloud from './ar-cloud';
import { BANUBA_CLIENT_TOKEN } from './BanubaClientToken';

async function init() {
  const player = await Player.create({
    clientToken: BANUBA_CLIENT_TOKEN,
  })

  const wcam = new Webcam({ width: 640, height: 480 })

  player.use(wcam)

  Dom.render(player, "#webar")

  document.querySelector("#reset").addEventListener("click", () => player.clearEffect())

  await banubaARCloud({
    urlId: 'YOUR URL ID',
    player: player,
    effectClass: Effect,
    container: 'carousel',
  })
}

init()

