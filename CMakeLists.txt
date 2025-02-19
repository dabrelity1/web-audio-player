cmake_minimum_required(VERSION 3.10)
project(SimpleEQ)

set(CMAKE_CXX_STANDARD 14)

# Set the path to the JUCE library
set(JUCE_DIR "C:/JUCE")

# Include JUCE headers
include_directories(${JUCE_DIR}/modules)

# Set the full path to Emscripten compilers
set(CMAKE_C_COMPILER "C:/CPP-EQ-WEBPORT/emsdk/upstream/emscripten/emcc.bat")
set(CMAKE_CXX_COMPILER "C:/CPP-EQ-WEBPORT/emsdk/upstream/emscripten/em++.bat")
set(CMAKE_TOOLCHAIN_FILE "C:/CPP-EQ-WEBPORT/emsdk/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake")
set(CMAKE_CROSSCOMPILING_EMULATOR "C:/CPP-EQ-WEBPORT/emsdk/node/20.18.0_64bit/bin/node.exe")


# Add JUCE modules
add_subdirectory(${JUCE_DIR} ${CMAKE_BINARY_DIR}/JUCE)

include_directories(${CMAKE_SOURCE_DIR})

# Add your source files
add_library(SimpleEQ SHARED
    PluginProcessor.cpp
    PluginEditor.cpp
)

# Link against JUCE libraries
target_link_libraries(SimpleEQ PRIVATE juce::juce_core juce::juce_audio_basics juce::juce_audio_processors)

set_target_properties(SimpleEQ PROPERTIES
    SUFFIX ".wasm"
    LINK_FLAGS "-s WASM=1 -s MODULARIZE=1 -s 'EXPORT_NAME=\"SimpleEQ\"' --bind"
    
)