import Test from './test';

export default function Page() {
    return (
        <div className="flex flex-col gap-12 sm:gap-16">
            <section>
                <h1 className="mb-4">Evaluation Form Experts</h1>
                <p>(beschrijving)</p>
            </section>

            <Test></Test>
        </div>
    );
}