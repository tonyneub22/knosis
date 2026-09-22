import Button from '../../components/ui/Button'
import LayerOverviewPage from '../../components/layers/LayerOverviewPage'
import { layer5, layer5Factors } from '../../data/layer5Factors'

export default function Overview() {
  return (
    <LayerOverviewPage
      layer={layer5}
      factors={layer5Factors}
      footer={
        <Button to="/#pyramid" variant="ghost" arrow="left">
          Back to the pyramid
        </Button>
      }
    />
  )
}
