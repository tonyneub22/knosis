import Button from '../../components/ui/Button'
import LayerOverviewPage from '../../components/layers/LayerOverviewPage'
import { layer6, layer6Factors, layer6Intro } from '../../data/layer6Factors'

export default function Overview() {
  return (
    <LayerOverviewPage
      layer={layer6}
      factors={layer6Factors}
      intro={<p className="max-w-xl font-display text-lg font-light italic leading-snug text-ivory-dim">{layer6Intro}</p>}
      footer={
        <Button to="/#pyramid" variant="ghost" arrow="left">
          Back to the pyramid
        </Button>
      }
    />
  )
}
