
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Move, MousePointerClick, Download, FileImage } from 'lucide-react';
import Footer from '@/components/footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="bg-background text-foreground py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
              The Easiest Way to Convert Images to PDF
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Drag, drop, reorder, and convert. Create professional PDFs from your images in seconds. Free and easy to use, right in your browser.
            </p>
            <Button asChild size="lg">
              <Link href="/convertor">
                Get Started for Free
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader className="items-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MousePointerClick className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Simple Drag & Drop</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Quickly upload your images by dragging them onto the upload area.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Move className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Reorder with Ease</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Effortlessly arrange your images in the desired order before conversion.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <FileImage className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Custom Page Sizes</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Each page in the PDF is perfectly sized to match its image dimensions.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                   <div className="p-3 bg-primary/10 rounded-full">
                    <Download className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Instant Download</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Generate and download your PDF file instantly, without any waiting.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              No sign-up required. Convert your first batch of images now.
            </p>
            <Button asChild size="lg">
              <Link href="/convertor">
                Go to Convertor
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
