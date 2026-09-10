namespace ai4cuav.Models.Enums
{
    public enum DetectionType
    {
        Thermal,
        Infrared,
        Visual
 
    }
    public enum DroneType
    {
        MultiRotor,
        FixedWing,
        SingleRotorHelicopter,
        HybridVTOL,
        NanoMicro,
        Cinewhoop,
        Tethered,
        FlappingWing
    }

    public enum MultiRotorClass
    {
        Tricopter,     
        Quadcopter,     
        Hexacopter,     
        Octocopter      
    }

    public enum FixedWingClass
    {
        StandardFixedWing,
        FlyingWing
    }

    public enum HybridVTOLClass
    {
        TiltRotor,
        SeparateLiftCruise
    }

    public enum DroneRecognitionType
    {
        BasicRecognition,
        AdvancedRecognition,
        AIEnhancedRecognition
    }

    public enum RecognitionMethod
    {
        BasedOnSources,     
        BasedOnTrajectories,  
        BasedOnVisuals,       
        BasedOnRF,           
        BasedOnAcoustics      
    }
}
