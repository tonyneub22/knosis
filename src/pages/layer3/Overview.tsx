import Button from '../../components/ui/Button'
import LayerOverviewPage from '../../components/layers/LayerOverviewPage'
import { layer3, layer3Factors } from '../../data/layer3Factors'

export default function Overview() {
  return (
    <LayerOverviewPage
      layer={layer3}
      factors={layer3Factors}
      footer={
        <Button to="/#pyramid" variant="ghost" arrow="left">
          Back to the pyramid
        </Button>
      }
    />
  )
}
