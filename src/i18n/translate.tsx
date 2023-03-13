import { FormattedMessage } from "react-intl";

const translate = (id: string, value: any = {}) => <FormattedMessage id={id} values={value} />;

export default translate;
