export default function getHandlers(props: any) {
	const { h, handler, handlers } = props;
	return h || handler || handlers;
}