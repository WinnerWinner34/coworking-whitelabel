We are going to recreate the "Modern" template for the Home page. We will do this in sections starting with the Feature list section. Please edit the feature section to be based off of the Original Code below. 
However to each box I want them altered to have:
1. no borders AND have Equal sized image and text box. 
2. The first feature will have text on the left, image on the right, the second feature will have image on the left, text on the right. Then it will alternate back and forth for the rest. 


Code Used:

Original Code
  import { Stack, Divider, Paper, Box, Typography } from '@mui/material';

  <Stack divider={<Divider />} spacing={2}>
    <Paper elevation={1} sx={{ p: 3 }}>
      <Box display="flex" gap={4}>
        <Box flex={1}>
          <Typography variant="h5">Item 1</Typography>
          <Typography color="text.secondary">Description...</Typography>
        </Box>
        <Box sx={{ width: 300 }}>
          <img src="your-image.jpg" alt="Item 1" style={{ width: '100%' }} />
        </Box>
      </Box>
    </Paper>
  </Stack>

No borders

  {/* Example 2: No Outlines/Borders */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">2. Remove Box Outlines/Borders</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-8 p-6 bg-transparent">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Clean Design</h3>
                  <p className="text-gray-600">No borders, shadows, or background colors.</p>
                </div>
                <div className="w-80 flex-shrink-0">
                  <div className="w-full h-32 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                    🎨 Clean Image
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-300"></div>
              <div className="flex items-center space-x-8 p-6 bg-transparent">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Minimal Style</h3>
                  <p className="text-gray-600">Focus on content, not containers.</p>
                </div>
                <div className="w-80 flex-shrink-0">
                  <div className="w-full h-32 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                    ✨ Minimal Image
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-gray-800 rounded p-4 text-green-400 font-mono text-sm">
              <pre>{`// Remove: bg="white", shadow="sm", rounded="lg"
  <HStack spacing={8} p={6}>  // Just padding, no styling
    <Box flex={1}>...</Box>
    <Box w="300px">...</Box>
  </HStack>`}</pre>
            </div>
          </section>



Equal Sized Image and Text box
   <div className="flex items-center space-x-8 p-6 bg-purple-50 rounded-lg">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">50/50 Split</h3>
                <p className="text-gray-600">Equal space for text and image.</p>
              </div>
              <div className="flex-1">
                <div className="w-full h-32 bg-purple-200 rounded-lg flex items-center justify-center text-purple-700">
                  Equal Size Image
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-gray-800 rounded p-4 text-green-400 font-mono text-sm">
            <pre>{`// Small image: w="150px" or w={150}
// Large image: w="500px" or w={500}  
// Equal sizes: Both boxes use flex={1}
// Fixed text width: <Box w="250px"> for text, <Box flex={1}> for image`}</pre>
          </div>
        </section>

    


Image on the left
    <div>
              <h4 className="font-semibold text-gray-600 mb-3">Image on Left:</h4>
              <div className="flex items-center space-x-8 p-6 bg-yellow-50 rounded-lg">
                <div className="w-60 flex-shrink-0">
                  <div className="w-full h-32 bg-yellow-200 rounded-lg flex items-center justify-center text-yellow-700">
                    Left Image
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Text on Right</h3>
                  <p className="text-gray-600">Image comes first, then text content.</p>
                </div>
              </div>
            </div>