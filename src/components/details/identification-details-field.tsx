import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { type CustomerFormType } from './customer-details-form'

type identificationDetailsFieldProps = {
	form: CustomerFormType
}

export function IdentificationDetailsField(props: identificationDetailsFieldProps) {
	return (
		<>
			<FormField
				control={props.form.control}
				name='idType'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							ID Type<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								className='bg-gray-975 border border-gray-375'
								id='idType'
								placeholder='Id Type'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={props.form.control}
				name='idNumber'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							ID Number<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								className='bg-gray-975 border border-gray-375'
								id='idNumber'
								placeholder='Id Number'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={props.form.control}
				name='preferredNotification'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Preferred Notification<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								className='bg-gray-975 border border-gray-375'
								id='notify'
								placeholder='Preferred Notification'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={props.form.control}
				name='taxExempted'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Tax Exempted<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							<Select
								disabled={field.disabled}
								name={field.name}
								value={field.value ? 'Yes' : 'No'}
								onValueChange={(e) => {
									field.onChange(e === 'Yes' ? true : false)
								}}>
								<SelectTrigger
									ref={field.ref}
									className='bg-gray-975 border border-gray-375'>
									<SelectValue placeholder='Tax Exempted' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem
										key={1}
										value='Yes'>
										Yes
									</SelectItem>
									<SelectItem
										key={2}
										value='No'>
										No
									</SelectItem>
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={props.form.control}
				name='status'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Status<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							<Select
								disabled={field.disabled}
								name={field.name}
								value={field.value ? 'Yes' : 'No'}
								onValueChange={(e) => {
									field.onChange(e === 'Yes' ? true : false)
								}}>
								<SelectTrigger
									ref={field.ref}
									className='bg-gray-975 border border-gray-375'>
									<SelectValue placeholder='Status' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem
										key={1}
										value='Active'>
										Active
									</SelectItem>
									<SelectItem
										key={2}
										value='Deactive'>
										Deactive
									</SelectItem>
									<SelectItem
										key={2}
										value='Pending'>
										Pending
									</SelectItem>
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}
