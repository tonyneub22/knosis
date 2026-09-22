import Button from '../../components/ui/Button'
import LayerOverviewPage from '../../components/layers/LayerOverviewPage'
import { layer1, layer1Factors } from '../../data/layer1Factors'

export default function Overview() {
  return (
    <LayerOverviewPage
      layer={layer1}
      factors={layer1Factors}
      intro={
        <>
          <p className="font-body text-[11px] uppercase tracking-[0.3em] text-gold/80">Four factors</p>
          <p className="mt-3 max-w-xl font-body text-[13px] font-light leading-relaxed text-ivory-dim">
            {layer1.band} {layer1.scope} Open a factor to read the mechanism, the best available estimate, and the strength of the evidence.
          </p>
        </>
      }
      footer={
        <>
          <Button to="/structural-conditions/cases">Continue</Button>
          <Button to="/structural-conditions/results" variant="ghost" arrow="none">
            Live results
          </Button>
        </>
      }
    />
  )
}
