type Props = {
    date: string;
};

export default function LastUpdated({ date }: Props) {
    return (
        <div className='last-updated'>
            <strong>Last Updated:</strong> {date}
        </div>
    );
}
