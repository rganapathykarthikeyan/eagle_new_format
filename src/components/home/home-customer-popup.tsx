import { Dialog, DialogContent } from '../ui/dialog'
import { HomeCustomerInfo } from './home-customer-info'

type HomeCustomerPopUpProps = {
	open: boolean
	openChange: () => void
}

export function HomeCustomerPopUp(props: HomeCustomerPopUpProps) {
	return (
		<Dialog
			open={props.open}
			onOpenChange={props.openChange}>
			<DialogContent>
				<HomeCustomerInfo />
			</DialogContent>
		</Dialog>
	)
}
