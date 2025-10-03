package com.example.feedback.exception;

/**
 * Exception thrown when inappropriate content is detected during content moderation.
 */
public class ContentModerationException extends RuntimeException {
    
    private final String detectedWord;
    private final String operation;
    
    public ContentModerationException(String message, String detectedWord, String operation) {
        super(message);
        this.detectedWord = detectedWord;
        this.operation = operation;
    }
    
    public ContentModerationException(String message, String detectedWord, String operation, Throwable cause) {
        super(message, cause);
        this.detectedWord = detectedWord;
        this.operation = operation;
    }
    
    public String getDetectedWord() {
        return detectedWord;
    }
    
    public String getOperation() {
        return operation;
    }
}