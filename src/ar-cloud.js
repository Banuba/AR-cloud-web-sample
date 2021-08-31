async function banubaARCloud({urlId, player, effectClass ,container }) {
  const SERVER_ENDPOINT = "https://api.arcloud.banuba.net/v1/effects/"

  const json = await fetch( SERVER_ENDPOINT + urlId)
  const jsonData = await json.json()

  const rootElement = document.getElementById(container)

  for (let effectData of jsonData.effects) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('ARCloud__image-wrapper')

    const image = document.createElement('img');
    image.classList.add('ARCloud__image')

    image.src = effectData.Preview

    image.onerror = () => {
      try {
        image.src = './images/img-placeholder.png'
        image.style = 'border-radius: 50%;'
      } catch (e) { console.log(e) }
    }

    imageContainer.addEventListener('click', async () => {
      const loading = document.createElement('div');
      loading.classList.add('lds-dual-ring')
      imageContainer.appendChild(loading)

      try {
        const effect = await new effectClass(effectData.URL)

        await player.applyEffect(effect)
      } finally {
        loading.remove()
      }
    })

    rootElement.appendChild(imageContainer)
    imageContainer.appendChild(image)
  }
}

export default banubaARCloud