
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Move, MousePointerClick, Download, FileImage, UploadCloud } from 'lucide-react';
import Footer from '@/components/footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow">
        <section className="text-foreground min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-gray-800">
              The Easiest Way to Convert Images to PDF
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Drag, drop, reorder, and convert. Create professional PDFs from your images in seconds. Free and easy to use, right in your browser.
            </p>
            <Button asChild size="lg" className="bg-[#E0BBE4] text-gray-800 hover:bg-[#d4a9d8]">
              <Link href="/convertor">
                Get Started for Free
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-20 md:py-32 bg-[#F5F5FF]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-white">
                <CardHeader className="items-center">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <MousePointerClick className="h-8 w-8 text-[#957DAD]" />
                  </div>
                  <CardTitle className="mt-4 text-gray-800">Simple Drag & Drop</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Quickly upload your images by dragging them onto the upload area.
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader className="items-center">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <Move className="h-8 w-8 text-[#957DAD]" />
                  </div>
                  <CardTitle className="mt-4 text-gray-800">Reorder with Ease</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Effortlessly arrange your images in the desired order before conversion.
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader className="items-center">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <FileImage className="h-8 w-8 text-[#957DAD]" />
                  </div>
                  <CardTitle className="mt-4 text-gray-800">Custom Page Sizes</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Each page in the PDF is perfectly sized to match its image dimensions.
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader className="items-center">
                   <div className="p-3 bg-primary/20 rounded-full">
                    <Download className="h-8 w-8 text-[#957DAD]" />
                  </div>
                  <CardTitle className="mt-4 text-gray-800">Instant Download</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Generate and download your PDF file instantly, without any waiting.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              How It Works in 3 Easy Steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="p-4 bg-primary/20 rounded-full mb-4">
                  <UploadCloud className="h-10 w-10 text-[#957DAD]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">1. Upload Your Images</h3>
                <p className="text-muted-foreground">
                  Click the upload area or drag and drop your image files. You can select multiple images at once.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-primary/20 rounded-full mb-4">
                  <Move className="h-10 w-10 text-[#957DAD]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">2. Arrange the Order</h3>
                <p className="text-muted-foreground">
                  Once uploaded, simply drag the images to arrange them in the perfect sequence for your PDF.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-primary/20 rounded-full mb-4">
                  <Download className="h-10 w-10 text-[#957DAD]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">3. Download Your PDF</h3>
                <p className="text-muted-foreground">
                  Give your file a name, click the "Create & Download" button, and your PDF will be ready instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-[#F5F5FF]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Ready to Start?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              No sign-up required. Convert your first batch of images now.
            </p>
            <Button asChild size="lg" className="bg-[#E0BBE4] text-gray-800 hover:bg-[#d4a9d8]">
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
