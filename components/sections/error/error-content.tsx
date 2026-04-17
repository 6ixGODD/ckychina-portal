export type ErrorContentData = {
    errorNumber: string;
    errorTitle: string;
    errorDescription: string;
};

type Props = {
    data: ErrorContentData;
};

export default function ErrorContent({ data }: Props) {
    return (
        <div className='row justify-content-center text-center'>
            <div className='col-lg-8'>
                <div className='error-content'>
                    <div className='error-number' data-aos='zoom-in' data-aos-delay='200'>
                        {data.errorNumber}
                    </div>

                    <h1 className='error-title' data-aos='fade-up' data-aos-delay='300'>
                        {data.errorTitle}
                    </h1>

                    <p className='error-description' data-aos='fade-up' data-aos-delay='400'>
                        {data.errorDescription}
                    </p>
                </div>
            </div>
        </div>
    );
}
