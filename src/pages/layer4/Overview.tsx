import Button from '../../components/ui/Button'
import LayerOverviewPage from '../../components/layers/LayerOverviewPage'
import { layer4, layer4Factors } from '../../data/layer4Factors'

export default function Overview() {
  return (
    <LayerOverviewPage
      layer={layer4}
      factors={layer4Factors}
      footer={
        <Button to="/#pyramid" variant="ghost" arrow="left">
          Back to the pyramid
        </Button>
      }
    />
  )
}
