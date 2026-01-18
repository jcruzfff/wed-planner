"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/page-container";
import { Header } from "@/components/layout/header";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header title="Privacy Policy" showBack />
      <PageContainer className="pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-sm max-w-none"
        >
          <p className="text-sm text-muted-foreground mb-6">
            Last updated: January 17, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Wed Planner (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you use our wedding planning application.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Information We Collect</h2>
            <p className="text-muted-foreground mb-3">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Account information (name, email address, password)</li>
              <li>Wedding details (date, venue, guest count, budget)</li>
              <li>Guest list information</li>
              <li>Vendor and booking information</li>
              <li>Moodboard and inspiration content</li>
              <li>Communications and messages within the app</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and manage your wedding planning activities</li>
              <li>Send you notifications and updates about your wedding</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Personalize your experience and provide recommendations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Information Sharing</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>With your consent or at your direction</li>
              <li>With vendors you choose to contact through the app</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational measures to protect 
              your personal information against unauthorized access, alteration, disclosure, 
              or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">
              Our app may integrate with third-party services such as Pinterest for 
              inspiration content. These services have their own privacy policies, and 
              we encourage you to review them. We are not responsible for the privacy 
              practices of third-party services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Your Rights</h2>
            <p className="text-muted-foreground mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify or update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Opt out of marketing communications</li>
              <li>Export your wedding planning data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Data Retention</h2>
            <p className="text-muted-foreground mb-4">
              We retain your information for as long as your account is active or as 
              needed to provide you services. You may request deletion of your account 
              and data at any time through the app settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Changes to This Policy</h2>
            <p className="text-muted-foreground mb-4">
              We may update this Privacy Policy from time to time. We will notify you 
              of any changes by posting the new Privacy Policy on this page and updating 
              the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Email: privacy@wedplanner.app
            </p>
          </section>
        </motion.div>
      </PageContainer>
    </>
  );
}
