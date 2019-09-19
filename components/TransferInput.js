import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';

class TransferInputComp extends React.Component {
	onInputChangeHandle = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.onSubmit(values);
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Form layout="vertical" onSubmit={this.onInputChangeHandle} style={{ marginTop: 32 }}>
				<Form.Item label="To">
					{getFieldDecorator('to', {})(<Input placeholder="To Address" />)}
				</Form.Item>
				<Form.Item label="Amount">
					{getFieldDecorator('amount', {
						initialValue: 0.01
					})(
						<InputNumber
							min={0.01}
							max={1.0}
							step={0.01}
							style={{ width: '100%' }}
							placeholder="Amount"
						/>
					)}
				</Form.Item>
				<Form.Item>
					<Button htmlType="submit" type="primary">
						TRANSFER
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const TransferInput = Form.create()(TransferInputComp);

export default TransferInput;
