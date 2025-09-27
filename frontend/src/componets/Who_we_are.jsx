import React from 'react'

function Who_we_are() {
    return (
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-20 xl:px-28 py-12 bg-white text-gray-800">
            {/* Hero */}
            <section className="max-w-7xl mx-auto text-center mb-12">
                <div className="text-[#BD9C85] font-semibold uppercase text-sm mb-2">Who We Are</div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase mb-4">Fresh, handmade products crafted with care</h1>
                <p className="text-gray-600 max-w-3xl mx-auto">We design and craft products that balance contemporary aesthetics with lasting quality. Every piece is made thoughtfully and with attention to detail — from concept to delivery.</p>
            </section>

            {/* Mission + Values */}
            <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2 bg-[#f8f2ee] rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
                    <p className="text-gray-700 leading-relaxed">To create timeless, handcrafted home products that bring joy and function into everyday life. We believe in sustainable practices, collaborating with skilled artisans, and designing items that become family heirlooms.</p>
                    <ul className="mt-4 space-y-2">
                        <li className="flex items-start gap-3">
                            <div className="bg-[#F4EBE4] rounded-full w-10 h-10 flex items-center justify-center">✓</div>
                            <div>
                                <strong>Designed with intention</strong>
                                <div className="text-sm text-gray-600">Every detail is considered to ensure longevity and beauty.</div>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="bg-[#F4EBE4] rounded-full w-10 h-10 flex items-center justify-center">✓</div>
                            <div>
                                <strong>Quality materials</strong>
                                <div className="text-sm text-gray-600">We source responsibly and prefer natural, durable materials.</div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="bg-white rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-3">At a glance</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Founded</span>
                            <span>2020</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Artisans</span>
                            <span>20+</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Ships to</span>
                            <span>Worldwide</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="max-w-7xl mx-auto mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-start">
                    {[
                        { title: 'Imaginative Design', desc: 'We collaborate with designers whose work reflects unique identities.' },
                        { title: 'Obsessive Quality', desc: 'Our dedication to quality influences every aspect of our brand.' },
                        { title: 'Effortless Experience', desc: 'A streamlined journey and quick delivery for every order.' },
                    ].map((f, i) => (
                        <div key={i} className="bg-white rounded-lg p-6">
                            <h4 className="font-semibold text-lg mb-2">{f.title}</h4>
                            <p className="text-gray-600 text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="max-w-7xl mx-auto mb-12">
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold">Meet the team</h3>
                    <p className="text-gray-600">A small group of makers, designers and coordinators who bring ideas to life.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-lg p-4 flex flex-col items-center text-center">
                            <div className="w-28 h-28 rounded-full bg-gray-200 mb-3 flex items-center justify-center">IMG</div>
                            <h5 className="font-semibold">Person {i}</h5>
                            <p className="text-sm text-gray-600">Role {i}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto text-center py-8">
                <h3 className="text-2xl font-semibold mb-3">Want to work with us?</h3>
                <p className="text-gray-600 mb-4">We’re always looking for collaborators and partners. Reach out and let’s create something beautiful.</p>
                <button className="bg-[#BD624C] hover:bg-[#a7503b] text-white px-6 py-3 rounded-md">Contact Us</button>
            </section>
        </div>
    )
}

export default Who_we_are
