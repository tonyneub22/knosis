import Button from '../../components/ui/Button'
import LayerOverviewPage from '../../components/layers/LayerOverviewPage'
import { layer2, layer2Factors } from '../../data/layer2Factors'

export default function Overview() {
  return (
    <LayerOverviewPage
      layer={layer2}
      factors={layer2Factors}
      footer={
        <Button to="/#pyramid" variant="ghost" arrow="left">
          Back to the pyramid
        </Button>
      }
    />
  )
}
