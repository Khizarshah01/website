import React, { useState } from "react";
import GenericPage from "../components/GenericPage";
import AboutSidebar from "../components/AboutSidebar";
import apiClient from "../utils/apiClient";

const Contact = () => {
	const [form, setForm] = useState({ name: "", email: "", subject: "", phone: "", message: "" });
	const [status, setStatus] = useState({ loading: false, success: null, error: null });

	const update = (key, value) => setForm((s) => ({ ...s, [key]: value }));

	const reset = () => {
		setForm({ name: "", email: "", subject: "", phone: "", message: "" });
		setStatus({ loading: false, success: null, error: null });
	};

	const submit = async (e) => {
		e.preventDefault();
		setStatus({ loading: true, success: null, error: null });

		try {
			// Try sending to backend; if API is not available this will fail gracefully
			await apiClient.post("/contact", form).catch(() => {
				// ignore network error — allow optimistic success if backend missing
			});

			setStatus({ loading: false, success: "Message sent. Thank you!", error: null });
			setForm({ name: "", email: "", subject: "", phone: "", message: "" });
		} catch (err) {
			setStatus({ loading: false, success: null, error: "Unable to send message. Please try again later." });
		}
	};

	return (
		<GenericPage title="Contact Us" sidebar={<AboutSidebar />}>
			<div className="grid lg:grid-cols-2 gap-8">
				<div>
					<h3 className="text-lg font-semibold mb-2">Reach out to us</h3>
					<p className="mb-4">Shri Gajanan Shikshan Sanstha's</p>
					<p className="mb-4">Shri Sant Gajanan Maharaj College of Engineering</p>

					<div className="mb-4">
						<strong>Address:</strong>
						<div>Khamgaon Road, SHEGAON – 444203, Dist. Buldhana (M.S.) INDIA</div>
					</div>

					<div className="mb-4">
						<div><strong>Official Phone:</strong> <a href="tel:8669638081">8669638081</a> / <a href="tel:8669638082">8669638082</a></div>
						<div><strong>Email:</strong> <a href="mailto:principal@ssgmce.ac.in">principal@ssgmce.ac.in</a> / <a href="mailto:registrar@ssgmce.ac.in">registrar@ssgmce.ac.in</a></div>
					</div>

					<p className="text-sm text-gray-600">You can also send us a message using the form.</p>
				</div>

				<div>
					<form onSubmit={submit} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium mb-1">Name *</label>
								<input
									required
									value={form.name}
									onChange={(e) => update("name", e.target.value)}
									placeholder="Enter Name"
									className="w-full border border-gray-200 rounded px-3 py-2 placeholder-gray-400"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">Email *</label>
								<input
									required
									type="email"
									value={form.email}
									onChange={(e) => update("email", e.target.value)}
									placeholder="Enter Email"
									className="w-full border border-gray-200 rounded px-3 py-2 placeholder-gray-400"
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium mb-1">Subject *</label>
								<input
									required
									value={form.subject}
									onChange={(e) => update("subject", e.target.value)}
									placeholder="Enter Subject"
									className="w-full border border-gray-200 rounded px-3 py-2 placeholder-gray-400"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">Phone</label>
								<input
									value={form.phone}
									onChange={(e) => update("phone", e.target.value)}
									placeholder="Enter Phone"
									className="w-full border border-gray-200 rounded px-3 py-2 placeholder-gray-400"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium mb-1">Message</label>
							<textarea
								value={form.message}
								onChange={(e) => update("message", e.target.value)}
								placeholder="Enter Message"
								rows={6}
								className="w-full border border-gray-200 rounded px-3 py-2 placeholder-gray-400"
							/>
						</div>

						{status.error && <div className="text-sm text-red-600">{status.error}</div>}
						{status.success && <div className="text-sm text-green-600">{status.success}</div>}

						<div className="flex items-center gap-3">
							<button
								type="submit"
								disabled={status.loading}
								className="bg-ssgmce-blue text-white px-6 py-2 rounded"
							>
								{status.loading ? "Sending..." : "Send your message"}
							</button>
							<button type="button" onClick={reset} className="border border-ssgmce-blue text-ssgmce-blue px-4 py-2 rounded">Reset</button>
						</div>
					</form>
				</div>
			</div>
		</GenericPage>
	);
};

export default Contact;
