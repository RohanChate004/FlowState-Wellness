function Testimonials() {
  const testimonials = [
    {
      name: "Omkar Sathe",
      role: "College Student",
      review:
        "FlowState has made it easier for me to manage study stress and take small wellness breaks every day.",
    },
    {
      name: "Shravani Talwar",
      role: "Software Developer",
      review:
        "The combination of yoga and meditation fits perfectly into my busy work schedule.",
    },
    {
      name: "Aditya Gaikwad",
      role: "Designer",
      review:
        "I love how simple FlowState feels. My daily routine finally feels calm and manageable.",
    },
  ];

  return (
    <section className="bg-[#f5faf7] py-20">

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">

          <p className="text-green-600 font-semibold text-sm uppercase tracking-wide">
            Community
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Loved by FlowState Users
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Small daily practices can make a meaningful difference.
          </p>

        </div>


        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 hover:shadow-md transition duration-300"
            >

              {/* Rating */}
              <div className="text-yellow-500 text-lg">
                ★★★★★
              </div>

              {/* Review */}
              <p className="text-gray-600 leading-relaxed mt-5">
                "{item.review}"
              </p>

              {/* User */}
              <div className="flex items-center gap-3 mt-7">

                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                  {item.name.charAt(0)}
                </div>

                <div>

                  <h3 className="font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;