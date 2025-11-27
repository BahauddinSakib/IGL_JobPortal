import Link from 'next/link';
import Image from 'next/image';

export default function Unauthorized() {
    return (
        <section className="bg-home d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-6 col-12">
                        <div className="p-4 bg-white rounded shadow-md text-center">
                            <Image 
                                src="/images/IGL_Group_logo.png" 
                                width={80} 
                                height={80} 
                                className="mb-4 d-block mx-auto" 
                                alt="IGL Logo"
                            />
                            <h3 className="text-danger mb-3">Access Denied</h3>
                            <p className="text-muted mb-4">
                                You don't have permission to access this page.
                            </p>
                            <div className="d-flex gap-2 justify-content-center">
                                <Link href="/" className="btn btn-primary">
                                    Go Home
                                </Link>
                                <Link href="/main/login" className="btn btn-outline-primary">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}